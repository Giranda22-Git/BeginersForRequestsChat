const router = require('express').Router()
const filter = require('../mongoApi/users/filter')

router.get('/', async (req, res) => {
  try {
    const findedUsers = await filter(req.body.filter)

    res.json(findedUsers)
  }
  catch (error) {
    console.log('get / users endPoint Error: ', error)
  }
})

module.exports = router
