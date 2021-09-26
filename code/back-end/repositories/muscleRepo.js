/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

module.exports = () => {

    const Muscle = require('../models/muscleModel')

    return {
        
        getAll: () => {
            return Muscle.find()
        },

        createMuscle: (name) => {
            return Muscle.create({ name })
        },

        removeAll: () => {
            return Muscle.deleteMany()
        }

    }
}
