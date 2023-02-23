const mongoChat = require('../models/chat')
const { v4: uuidv4 } = require('uuid')


const filter = async function (condition) {
  try {
    const filteredChatsArray = await mongoChat.find(condition).lean().exec()

    return filteredChatsArray
  }
  catch (error) {
    console.log('filter chat mongoApi Error: ', error)
    return []
  }
}

const create = async function (chatData) {
  try {
    const chatModel = new mongoChat({
      ...chatData,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const chatCreateLog = await chatModel.save()

    return chatCreateLog
  }
  catch (error) {
    console.log('create chat mongoApi Error: ', error)
    return {}
  }
}

const remove = async function (condition) {
  try {
    const chatRemoveLog = await mongoChat.deleteMany(condition)

    return chatRemoveLog
  }
  catch (error) {
    console.log('remove chat mongoApi Error: ', error)
    return {}
  }
}

const update = async function (condition, update) {
  try {
    const chatUpdateLog = await mongoChat.updateMany(
      condition,
      {
        ...update,
        updatedAt: new Date()
      }
    )

    return chatUpdateLog
  }
  catch (error) {
    console.log('update chat mongoApi Error: ', error)
    return {}
  }
}

const addMembers = async function (chatId, usersId) {
  try {
    const updateLog = await update({ _id: chatId }, { $push: { members: { $each: usersId }}})

    return updateLog
  }
  catch (error) {
    console.log('addMembers chat mongoApi Error: ', error)
    return false
  }
}

const expelMembers = async function (chatId, usersId) {
  try {
    const updateLog = await update({ _id: chatId }, { $pull: { members: { $each: usersId }}})

    return updateLog
  }
  catch (error) {
    console.log('expelMembers chat mongoApi Error: ', error)
    return false
  }
}

const addMessage = async function (chatId, login, text) {
  try {

    const message = {
      timestamp: new Date(),
      from: login,
      text,
      id: uuidv4()
    }

    const updateLog = await update(
      { _id: chatId },
      { $push: { history: message } }
    )

    return message
  }
  catch (error) {
    console.log('addMessage chat mongoApi Error: ', error)
    return false
  }
}

// const editMessage = async function (chatId, messageId, text) {
//   try {
//     const targetChat = (await filter({ _id: chatId }))[0]

//     if (!targetChat || !Array.isArray(targetChat.history) || !targetChat.history?.length) return false

//     const targetMessage = targetChat.history.map(el => el.id === messageId)
    
//     const updateLog = await update({ _id: chatId }, )
//   }
//   catch (error) {
//     console.log('editMessage chat mongoApi Error: ', error)
//     return false
//   }
// }

// const removeMessage = async function () {
//   try {

//   }
//   catch (error) {
//     console.log('removeMessage chat mongoApi Error: ', error)
//     return false
//   }
// }



module.exports = {filter, create, remove, update, addMembers, expelMembers, addMessage}