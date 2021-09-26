/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const mongoose = require('../connection')

const activityMuscleSchema = new mongoose.Schema({
    idMuscle: String,
    name: String
}, { _id: false })

const customActivitySchema = new mongoose.Schema({
    name: String,
    muscles: [activityMuscleSchema],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    image: String,
    description: String
})

const userCustomsSchema = new mongoose.Schema({
    idUser: String,
    customs: [customActivitySchema],
}, { _id: false })

const UserCustomsModel = mongoose.model('UserCustoms', userCustomsSchema)

module.exports = UserCustomsModel
