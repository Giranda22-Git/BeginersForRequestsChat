const mongoUser = require('../models/user')

const filter = async function (condition) {
  try {
    const filteredUsersArray = await mongoUser.find(condition).lean().exec()

    return filteredUsersArray
  }
  catch (error) {
    console.log('filter user mongoApi Error: ', error)
  }
}

const create = async function (userData) {
  try {
    const userModel = new mongoUser(userData)

    const userCreateLog = await userModel.save()

    return userCreateLog
  }
  catch (error) {
    console.log('create user mongoApi Error: ', error)
  }
}

const remove = async function (condition) {
  try {
    const userRemoveLog = await mongoUser.delete(condition)

    return userRemoveLog
  }
  catch (error) {
    console.log('remove user mongoApi Error: ', error)
  }
}

const update = async function (condition, update) {
  try {
    const updateLog = await mongoUser.update(condition, update)

    return updateLog
  }
  catch (error) {
    console.log('update user mongoApi Error: ', error)
  }
}

module.exports = { filter, create, remove, update }
