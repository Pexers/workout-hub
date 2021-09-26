/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../authConfig.json')
const UserRepo = require('../repositories/userRepo')()

router.post('/register', async (req, res) => {
    try {
        const userCreated = await UserRepo.createUser(req.body)
        res.send({ username: userCreated.username, role: userCreated.role })
    } catch {
        res.status(400).send({ error: 'Error creating user' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const userFound = await UserRepo.getUserByName(username)
        // Verifying credentials
        if (!userFound || !await bcrypt.compare(password, userFound.password))
            return res.status(400).send({ error: 'Bad credentials' })

        // Creating access token with userId, role and application secret (expires in 2h)
        const token = jwt.sign({ idUser: userFound._id, role: userFound.role }, authConfig.secret, { expiresIn: 7200000 })

        // Building user response object. This is necessary beacause we can't write over the _id field
        const user = {
            username: userFound.username, role: userFound.role, sex: userFound.sex,
            age: userFound.age, weight: userFound.weight, height: userFound.height
        }
        res.send({ user, token })
    } catch (err) {
        res.status(400).send({ error: 'Error authenticating' })
    }
})

module.exports = app => app.use('/auth', router)
