const mongoUser = require('../../models/users')

const filter = async function (condition) {
  try {
    const filteredUsersArray = await mongoUser.find(condition).lean().exec()

    return filteredUsersArray
  }
  catch (error) {
    console.log('filter users mongoApi Error: ', error)
  }
}

module.exports = filter
