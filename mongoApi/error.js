const mongoError = require('../models/error')

const create = async function (errorData) {
  try {
    const newError = new mongoError(errorData)

    const createErrorLog = await newError.save()

    return createErrorLog
  }
  catch (error) {
    console.log(error)
  }
}

module.exports = {create, model: mongoError}
