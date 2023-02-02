const router = require('express').Router()
const fs = require('fs')


router.post('/error', async (req, res) => {
  try {
    const { data, subfix } = req.body

    const dataDumps = await fs.promises.readdir('./endPoints/dataDumps')

    console.log({dataDumps})

    const fileName = `error_dump_${subfix}_${dataDumps.length + 1}.dump`

    await fs.promises.writeFile(`./endPoints/dataDumps/${fileName}`, data)

    res.json({ url: 'http://195.49.210.34/docs/file/' + fileName })
  }
  catch (error) {
    console.log(error)
    return error
  }
})

router.get('/', async (req, res) => {
  try {
    const dataDumps = await fs.promises.readdir('./endPoints/dataDumps')

    return res.json(dataDumps)
  }
  catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

router.get('/file/:fileName', async (req, res) => {
  try {
    const { fileName } = req.params

    const dumpContent = Buffer.from(await fs.promises.readFile('./endPoints/dataDumps/' + fileName)).toString('utf-8')

    return res.json({ dumpContent })
  }
  catch (error) {
    console.log(error)
    return res.json({ error })
  }
})


module.exports = router
