const router = require('express').Router()
const mongoErrorApi = require('../mongoApi/error')


router.post('/error', async (req, res) => {
  try {
    const createLog = await mongoErrorApi.create(req.body)

    res.json(createLog)
  }
  catch (error) {
    console.log(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const entities = await mongoErrorApi.model.find({}).lean()

    return res.json(entities)
  }
  catch (error) {
    console.log(error)
    return res.json({ error })
  }
})


module.exports = router
