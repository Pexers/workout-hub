/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const router = require('express').Router()
const MuscleRepo = require('../repositories/muscleRepo')()

const authMiddleware = require('../authMiddleware')
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const muscles = await MuscleRepo.getAll()
        res.send({ muscles })
    } catch {
        res.status(400).send({ error: 'Error loading muscles' })
    }
})

module.exports = app => app.use('/muscle', router)
