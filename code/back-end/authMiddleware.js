/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const jwt = require('jsonwebtoken')
const authConfig = require('./authConfig.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).send({ error: 'Bad request' })

    const parts = authHeader.split(' ')
    if (parts.length !== 2)
        return res.status(401).send({ error: 'Bad request' })

    const [scheme, token] = parts
    if (scheme !== 'Bearer')
        return res.status(401).send({ error: 'Bad request' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Bad request' })
        req.role = decoded.role;
        req.idUser = decoded.idUser
        return next()
    })
}
