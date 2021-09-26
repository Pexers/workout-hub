/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

module.exports = () => {

    const Plan = require('../models/planModel')

    return {

        getPlan: (idPlan) => {
            return Plan.findById(idPlan)
        },

        getUserPlans: (idUser) => {
            return Plan.find({ idUser }, { idUser: false })
        },

        createPlanActivity: async (idUser, idPlan, idActivity, info) => {
            const plan = await Plan.findById(idPlan)
            if (plan.idUser !== idUser)
                throw new Exception('The user is not the owner of the plan')
            plan.activities.push({ idActivity, setsType: info.setsType, sets: info.sets, restTime: info.restTime })
            return plan.save()
        },

        createPlan: ({ idUser, name, description, activities }) => {
            return Plan.create({ idUser, name, description, activities })
        },

        removeUserPlans: (idUser) => {
            return Plan.deleteMany({ idUser })
        },

        removeAll: () => {
            return Plan.deleteMany()
        }

    }
}
