/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

module.exports = () => {

    const Activity = require('../models/activityModel')

    return {

        // Filters are not used for now
        getActivities: (search, filters, skip) => {
            return Activity
                .find({ name: new RegExp(search, 'i') }) // Using regular expression to include search with case insensitive -> i
                .sort({ name: 1 }) // Sorting name by ascending order -> 1
                .skip(skip * 1) // Skipping values for pagination
                .limit(12)
        },

        getSingleActivity: (idActivity) => {
            return Activity.findById(idActivity)
        },

        createActivity: ({ name, muscles, difficulty, image, description }) => {
            return Activity.create({ name, muscles, difficulty, image, description })
        },

        removeAll: () => {
            return Activity.deleteMany()
        }

    }
}
