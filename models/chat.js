const mongoose = require('mongoose')

const chat = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  members: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }],
    required: true
  } ,
  history: [{
    text: String,
    timestamp: Date,
    from: String, // user unique login
    id: String
  }]
})

const mongoChat = mongoose.model('chats', chat)
module.exports = mongoChat
