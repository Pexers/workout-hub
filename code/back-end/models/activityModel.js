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

const activitySchema = new mongoose.Schema({
  name: String,
  muscles: [activityMuscleSchema],
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  image: Buffer,
  description: String
})

const ActivityModel = mongoose.model('Activity', activitySchema)

module.exports = ActivityModel
