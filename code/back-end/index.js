/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require('./controllers/authController')(app)
require('./controllers/activityController')(app)
require('./controllers/planController')(app)
require('./controllers/muscleController')(app)
require('./controllers/userController')(app)
require('./controllers/dbController')(app)

app.listen(PORT, () => console.log('Listening at port ' + PORT + ' ..'))
