const router = require('express').Router()
const mongoChatApi = require('../mongoApi/chat')
const mongoUserApi = require('../mongoApi/user')
const { v4: uuidv4 } = require('uuid')
const mongoUser = require('../models/user')
const mongoose = require('mongoose')
const broadcast = require('../webSocket/broadcast')

router.post('/delete/all', async (req, res) => {
  try {
    const result = await mongoChatApi.remove({})

    return res.json(result)
  }
  catch (error) {
    console.log('post /delete/all chat endPoint Error: ', error)
    return res.json(error)
  }
})

router.post('/remove', async (req, res) => {
  try {
    const startTime = new Date()
    const { id } = req.body

    const removeLog = await mongoChatApi.remove({ _id: id })

    const endTime = new Date()

    if (!id) return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /remove',
        body: req.body,
        count: 0,
        leadTime: `${endTime - startTime}ms`
      },
      payload: removeLog
    })
  }
  catch (error) {
    console.log('post /remove chat endPoint Error: ', error)
    return res.json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const startTime = new Date()

    const findedChats = await mongoChatApi.filter({})

    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'get /',
        body: req.params,
        count: findedChats.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: findedChats
    })
  }
  catch (error) {
    console.log('get / chat endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'get /',
        body: req.params,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    if (!req.params?.id) throw 'Не пришел параметр id'

    const startTime = new Date()

    const targetChat = await mongoChatApi.filter({ _id: req.params.id })

    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'get /',
        body: req.params,
        count: targetChat.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: targetChat
    })
  }
  catch (error) {
    console.log('get /:id chat endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'get /:id',
        body: req.params,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})


router.get('/user/:login', async (req, res) => {
  try {
    if (!req.params?.login) throw 'Не пришел параметр login'

    const startTime = new Date()

    const targetChats = await mongoChatApi.filter({ members: req.params.login })

    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'get /user/:id',
        body: req.params,
        count: targetChats.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: targetChats
    })
  }
  catch (error) {
    console.log('get /user/:id chat endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'get /user/:id',
        body: req.params,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

router.post('/send/text', async (req, res) => {
  try {
    if (!req.body?.login) throw 'Не пришел параметр login'
    if (!req.body?.text) throw 'Не пришел параметр text'
    if (!req.body?.chatId) throw 'Не пришел параметр chatId'

    const startTime = new Date()

    console.log({login: req.body.login})

    const targetUser = (await mongoUserApi.filter({ login: req.body.login }))[0]
    const targetChat = (await mongoChatApi.filter({ _id: req.body.chatId }))[0]

    if (!targetUser) throw 'Пользователя с таким логином не существует'
    if (!targetChat) throw 'Чата с таким chatId не существует'

    const updateLog = await mongoChatApi.addMessage(req.body.chatId, req.body.login, req.body.text)
    console.log({targetChat})
    const membersWithOutSender = targetChat.members.filter(member => {
      return member !== req.body.login
    })

    console.log({membersWithOutSender})

    broadcast(membersWithOutSender, JSON.stringify({
      type: 'newMessage',
      payload: {...updateLog, chatId: req.body.chatId}
    }))

    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'post /send/text',
        body: req.body,
        count: 1,
        leadTime: `${endTime - startTime}ms`
      },
      payload: updateLog
    })
  }
  catch (error) {
    console.log('post /send/text chat endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /send/text',
        body: req.body,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

router.post('/create', async (req, res) => {
  try {
    if (!req.body?.userId) throw 'Не пришел параметр userId'
    if (!req.body?.label) throw 'Не пришел параметр label'
    if (!Array.isArray(req.body?.members)) throw 'Не правельный параметр members'

    const targetUser = await mongoUser.findOne({ _id: req.body.userId }).lean().exec()

    if (!targetUser) throw 'Такого пользователя не существует'

    req.body.members.push(targetUser.login)

    if (req.body.members.length < 2) throw 'В чате должно быть хотя бы 2 участника'

    const startTime = new Date()

    const chatData = {
      owner: req.body.userId,
      label: req.body.label,
      description: req.body.description,
      members: req.body.members,
      history: [{
        text: 'Системное сообщение, чат успешно создан',
        timestamp: new Date(),
        from: 'system', // user unique login
        id: uuidv4()
      }]
    }

    const createLog = await mongoChatApi.create(chatData)

    const endTime = new Date()

    broadcast(req.body.members, JSON.stringify(
      {
        type: 'newChat',
        payload: createLog
      }
    ))

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'post /create',
        body: req.body,
        count: 1,
        leadTime: `${endTime - startTime}ms`
      },
      payload: createLog
    })
  }
  catch (error) {
    console.log('post /create chat endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /create',
        body: req.body,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})


module.exports = router
