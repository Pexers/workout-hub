/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const mongoose = require('../connection')

const setSchema = new mongoose.Schema({
    weight: {
        min: 0,
        max: 999,
        type: Number
    },
    reps: {
        min: 0,
        max: 999,
        type: Number
    },
    time: {
        min: 0,
        max: 999,
        type: Number
    }
}, { _id: false })

const planActivitySchema = new mongoose.Schema({
    idActivity: String,
    setsType: { type: String, enum: ['RepSets', 'TimedSets'] },
    sets: [setSchema],
    restTime: Number
}, { _id: false })

const planSchema = new mongoose.Schema({
    idUser: String,
    name: String,
    description: String,
    activities: [planActivitySchema],
})

const PlanModel = mongoose.model('Plan', planSchema)

module.exports = PlanModel
