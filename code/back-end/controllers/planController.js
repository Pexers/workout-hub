/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const router = require('express').Router()
const PlanRepo = require('../repositories/planRepo')()
const ActivityRepo = require('../repositories/activityRepo')()

const authMiddleware = require('../authMiddleware')
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const { idUser } = req
        const plans = await PlanRepo.getUserPlans(idUser)
        // Reversing order of elements, so that they are ordered by creation
        res.send({ plans: plans.reverse() })
    } catch {
        res.status(400).send({ error: 'Error loading plans' })
    }
})

router.get('/:idPlan/activities', async (req, res) => {
    try {
        const { idPlan } = req.params
        const { idUser } = req
        const plan = await PlanRepo.getPlan(idPlan)
        // Checking if user owns the plan
        if (idUser !== plan.idUser)
            res.status(400).send({ error: 'Error loading activities from plan' })
        const activities = await Promise.all(plan.activities.map(async activity => await ActivityRepo.getSingleActivity(activity.idActivity)))
        res.send({ activities })
    } catch {
        res.status(400).send({ error: 'Error loading activities from plan' })
    }
})

router.post('/:idPlan/activity', async (req, res) => {
    try {
        const { idPlan } = req.params
        const { idActivity, info } = req.body
        const { idUser } = req
        if (!ActivityRepo.getSingleActivity(idActivity))
            res.status(400).send({ error: 'Error creating activity' })
        await PlanRepo.createPlanActivity(idUser, idPlan, idActivity, info)
        res.send({ message: 'Activity was added' })
    } catch (err) {
        res.status(400).send({ error: 'Error creating activity' })
    }
})

module.exports = app => app.use('/plan', router)
