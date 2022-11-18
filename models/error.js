const mongoose = require('mongoose')

const error = new mongoose.Schema({
  parsedDocuments: {
    type: String
  },
  xml: {
    type: String
  },
  error: {
    type: mongoose.Schema.Types.Mixed
  }
})

const mongoError = mongoose.model('errors', error)
module.exports = mongoError
