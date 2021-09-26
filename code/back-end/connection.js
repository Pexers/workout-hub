/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/workout-hub-DB')

module.exports = mongoose

