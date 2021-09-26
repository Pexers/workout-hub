/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

module.exports = () => {

    const User = require('../models/userModel')
    const bcrypt = require('bcryptjs')

    function encryptPassword(password) { return bcrypt.hash(password, 5) }

    return {

        getUsers: (search, role, skip) => {
            return User
                .find({ username: new RegExp(search, 'i'), role }, { sex: false, age: false, height: false, weight: false, password: false })
                .sort({ username: 1 }) // Sorting name by ascending order -> 1
                .skip(skip * 1) // Skipping values for pagination
                .limit(25)
        },

        getUserByName: (username) => {
            return User.findOne({ username })
        },

        createUser: async ({ username, password, role, sex, age, weight, height }) => {
            if (await User.findOne({ username }))
                throw new Exception('User already exists')
            password = await encryptPassword(password)
            return User.create({ username, password, role, sex, age, weight, height });
        },

        updateUserData: async (idUser, data) => {
            const user = await User.findById(idUser)
            // Updating password
            if (data.newPassword) {
                if (!await bcrypt.compare(data.oldPassword, user.password))
                    throw new Exception('User passwords do not match')
                // Length of 3 should only be used in first version of application
                if (data.newPassword.length < 3)
                    throw new Exception('New password too short')
                user.password = await encryptPassword(data.newPassword)
                await user.save()
                return user
            }
            else {
                user.sex = data.sex
                user.age = data.age
                user.weight = data.weight
                user.height = data.height
                await user.save()
                return user
            }
        },

        updateUserRole: async (idUser, role) => {
            const user = await User.findById(idUser)
            user.role = role
            return user.save()
        },

        removeUser: async (idUser) => {
            return User.deleteOne({ _id: idUser })
        },

        removeAll: () => {
            return User.deleteMany()
        }

    }
}
