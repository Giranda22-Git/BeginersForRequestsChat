const mongoose = require('mongoose')

const user = new mongoose.Schema({
  name: {
    type: String
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: String
  }
})

const mongoUser = mongoose.model('users', user)
module.exports = mongoUser
