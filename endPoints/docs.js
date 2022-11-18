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


module.exports = router
