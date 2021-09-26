/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const mongoose = require('../connection')

const muscleSchema = new mongoose.Schema({
  name: String
})

const MuscleModel = mongoose.model('Muscle', muscleSchema)

module.exports = MuscleModel
