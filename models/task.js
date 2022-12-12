const mongoose = require('mongoose')

const task = new mongoose.Schema({
  label: {
    type: String
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean
  }
})

const mongoTask = mongoose.model('tasks', task)
module.exports = mongoTask
