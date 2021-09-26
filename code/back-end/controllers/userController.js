/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const router = require('express').Router()
const PlanRepo = require('../repositories/userRepo')()
const UserCustomsRepo = require('../repositories/userRepo')()
const UserRepo = require('../repositories/userRepo')()

const authMiddleware = require('../authMiddleware')
router.use(authMiddleware)

const checkPermissions = (role) => { return role === 'Admin' }

router.get('/', async (req, res) => {
    try {
        if (!checkPermissions(req.role))
            return res.status(401).send({ error: 'Bad request' })
        const { search, role, skip } = req.query
        const users = await UserRepo.getUsers(search, role, skip)
        res.send({ users })
    } catch {
        res.status(400).send({ error: 'Error loading users' })
    }
})

router.put('/role', async (req, res) => {
    try {
        if (!checkPermissions(req.role))
            return res.status(401).send({ error: 'Bad request' })
        const { idUser, role } = req.body
        if (role !== 'Admin' && role !== 'Exerciser')
            return res.status(400).send({ error: 'Error updating user' })
        await UserRepo.updateUserRole(idUser, role)
        res.send({ message: 'User was updated' })
    } catch {
        res.status(400).send({ error: 'Error updating user' })
    }
})

router.put('/data', async (req, res) => {
    try {
        const { data } = req.body
        const userUpdated = await UserRepo.updateUserData(req.idUser, data)
        const user = {
            username: userUpdated.username, role: userUpdated.role, sex: userUpdated.sex,
            age: userUpdated.age, weight: userUpdated.weight, height: userUpdated.height
        }
        res.send({ user })
    } catch {
        res.status(400).send({ error: 'Error updating user' })
    }
})

router.delete('/:idUser', async (req, res) => {
    try {
        if (!checkPermissions(req.role))
            return res.status(401).send({ error: 'Bad request' })
        const { idUser } = req.params
        await PlanRepo.removeUserPlans(idUser)
        await UserCustomsRepo.removeUserCustoms(idUser)
        await UserRepo.removeUser(idUser)
        res.send({ message: 'User was removed' })
    } catch {
        res.status(400).send({ error: 'Error deleting user' })
    }
})

module.exports = app => app.use('/user', router)
