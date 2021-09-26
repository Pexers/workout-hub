/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const router = require('express').Router()
const ActivityRepo = require('../repositories/activityRepo')()

const authMiddleware = require('../authMiddleware')
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const { search, filters, skip } = req.query
        const activities = await ActivityRepo.getActivities(search, filters, skip)
        res.send({ activities })
    } catch {
        res.status(400).send({ error: 'Error loading activities' })
    }
})

module.exports = app => app.use('/activity', router)
