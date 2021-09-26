/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const router = require('express').Router()
const fillDbJson = require('../fill-DB.json')
const fs = require('fs')

const ActivityRepo = require('../repositories/activityRepo')()
const UserCustomsRepo = require('../repositories/userCustomsRepo')()
const MuscleRepo = require('../repositories/muscleRepo')()
const PlanRepo = require('../repositories/planRepo')()
const UserRepo = require('../repositories/userRepo')()

/****** THIS FILE IS ONLY USED TO POPULATE THE DATABASE  ******/

router.delete('/deleteMany', async (req, res) => {
    try {
        Promise.all(
            [ActivityRepo.removeAll(),
            UserCustomsRepo.removeAll(),
            MuscleRepo.removeAll(),
            PlanRepo.removeAll(),
            UserRepo.removeAll()]
        ).then(() => res.send({ message: 'Everything was deleted' }))
    } catch {
        res.status(400).send({ error: 'Error deleting many' })
    }
})

router.post('/insertMany', async (req, res) => {
    try {
        const usersP = Promise.all(fillDbJson.User.map(async user => await UserRepo.createUser(user)))
        // Awaiting for muscles so that they can be used in activities
        const muscles = await Promise.all(fillDbJson.Muscle.map(async muscle => await MuscleRepo.createMuscle(muscle.name)))
        const activitiesP = Promise.all(fillDbJson.Activity.map(async activity => {
            activity.muscles = activity.muscles.map(muscle => { return { idMuscle: muscles[muscle.idMuscle]._id, name: muscle.name } })
            try { activity.image = fs.readFileSync('./images/' + activity.image) } catch (err) { activity.image = "" }
            return await ActivityRepo.createActivity(activity)
        }))
        Promise.all([usersP, activitiesP]).then(data => {
            const users = data[0]
            const activities = data[1]
            const plansP = Promise.all(fillDbJson.Plan.map(async plan => {
                plan.activities = plan.activities.map((activity) => {
                    return {
                        idActivity: activities[activity.idActivity]._id, setsType: activity.setsType,
                        sets: activity.sets, restTime: activity.restTime
                    }
                })
                plan.idUser = users[plan.idUser]._id
                return await PlanRepo.createPlan(plan)
            }))
            plansP.then(() => res.send({ message: 'Everything was inserted' }))
        })
    } catch (err) {
        res.status(400).send({ error: 'Error inserting many' })
    }
})

module.exports = app => app.use('/db', router)
