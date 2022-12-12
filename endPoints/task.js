const router = require('express').Router()
const mongoTaskApi = require('../mongoApi/task')

router.get('/', async (req, res) => {
  try {
    const tasks = await mongoTaskApi.model.find({})

    return res.json(tasks)
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


router.post('/create', async (req, res) => {
  const task = await mongoTaskApi.create(req.body?.task)

  return res.json(task)
})

router.post('/active', async (req, res) => {
  const task = await mongoTaskApi.updateStatus(req.body?.id, true)

  return task
})

router.post('/passive', async (req, res) => {
  const task = await mongoTaskApi.updateStatus(req.body?.id, false)

  return res.json(task)
})

router.post('/label', async (req, res) => {
  const task = await mongoTaskApi.updateLabel(req.body?.id, req.body?.label)

  return res.json(task)
})

router.post('/description', async (req, res) => {
  const task = await mongoTaskApi.updateDescription(req.body?.id, req.body?.description)

  return res.json(task)
})

router.post('/remove', async (req, res) => {
  const task = await mongoTaskApi.remove(req.body?.id)

  return res.json(task)
})

module.exports = router