/*
 *
 * Copyright (c) Sun Sep 26 2021, Pexers (https://github.com/Pexers)
 *
 */

const mongoose = require('../connection')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Exerciser'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    enum: ['Male', 'Female'],
  },
  age: {
    type: Number,
    min: 12,
    max: 120
  },
  weight: {
    type: Number,
    min: 30,
    max: 300
  },
  height: {
    type: Number,
    min: 1.30,
    max: 2.10
  }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
