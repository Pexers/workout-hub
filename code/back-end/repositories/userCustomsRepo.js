/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

module.exports = () => {

    const UserCustoms = require('../models/userCustomsModel')

    return {

        removeUserCustoms: (idUser) => {
            return UserCustoms.deleteOne({ idUser })
        },

        removeAll: () => {
            return UserCustoms.deleteMany()
        }

    }
}
