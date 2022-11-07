const router = require('express').Router()
const mongoUserApi = require('../mongoApi/user')

router.get('/', async (req, res) => {
  try {
    const startTime = new Date()
    const findedUsers = await mongoUserApi.filter({})
    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'get /user/',
        body: req.params,
        count: findedUsers.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: findedUsers
    })
  }
  catch (error) {
    console.log('get / user endPoint Error: ', error)
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
    const startTime = new Date()
    const findedUsers = await mongoUserApi.filter({ _id: req?.params?.id })
    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'get /user/:id',
        body: req.params,
        count: findedUsers.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: findedUsers
    })
  }
  catch (error) {
    console.log('get /:id user endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'get /:id/',
        body: req.params,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

router.post('/authorization', async (req, res) => {
  try {
    const startTime = new Date()

    const targetUserData = await mongoUserApi.filter({
      login: req.body?.userData?.login,
      password: req.body?.userData?.password
    })

    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'post /authorization/',
        body: req.body,
        count: targetUserData.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: {
        isAuth: Boolean(targetUserData.length),
        userData: targetUserData
      }
    })
  }
  catch (error) {
    console.log('post /authorization user endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /authorization/',
        body: req.body,
        count: 0,
        leadTime: '0ms'
      },
      payload: error
    })
  }
})

router.post('/registration', async (req, res) => {
  try {

    console.log(req)
    const startTime = new Date()

    const targetUserData = await mongoUserApi.filter({ login: req.body?.userData?.login })

    if (!targetUserData) throw 'Пользователь с таким логином уже существует'
    if (req.body?.userData?.login?.length < 6) throw 'Логин меньше 6 символов'
    if (req.body?.userData?.password !== req.body?.userData?.tryPassword) throw 'Пароли не совпадают'
    if (req.body?.userData?.password?.length < 6) throw 'Пароль меньше 6 символов'

    const createUserLog = await mongoUserApi.create(req.body?.userData)

    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'post /create/',
        body: req.body,
        count: 1,
        leadTime: `${endTime - startTime}ms`
      },
      payload: createUserLog
    })
  }
  catch (error) {
    console.log('post /create user endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /create/',
        body: req.body,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

router.post('/delete', async (req, res) => {
  try {
    const startTime = new Date()
    const deleteUserLog = await mongoUserApi.remove({_id: req.body?.id})
    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'post /delete/',
        body: req.body,
        count: deleteUserLog.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: deleteUserLog
    })
  }
  catch (error) {
    console.log('post /delete user endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /delete/',
        body: req.body,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

router.post('/update', async (req, res) => {
  try {
    const startTime = new Date()
    const updateUserLog = await mongoUserApi.update(req.body?.filter, req.body?.update)
    const endTime = new Date()

    return res.json({
      info: {
        status: 'OK',
        headRequest: 'post /update/',
        body: req.body,
        count: updateUserLog.length,
        leadTime: `${endTime - startTime}ms`
      },
      payload: updateUserLog
    })
  }
  catch (error) {
    console.log('post /update user endPoint Error: ', error)
    return res.json({
      info: {
        status: 'Error',
        headRequest: 'post /update/',
        body: req.body,
        count: 0,
        leadTime: `0ms`
      },
      payload: error
    })
  }
})

module.exports = router
