const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// require mongo models
// ---

// require settings data
const settings = require('./staticData/settings.js')

// initial express js application
const app = express()

// standart express middleweare settings
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use((req, res, next) => {
	res.contentType('application/json')
	next()
})
app.use(cors())

// require global functions
// ---

// require scripts unrecomended*
// ---

// declare init program function
async function init (settings) {

  // connect to mongodb
  mongoose.connect(settings.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 200,
    promoteBuffers: true,
    bufferCommands: false
  })
    .then(console.log("connected to server"))
    .catch((err) => console.log(err));

  // function of event on mongodb connection open
  mongoose.connection.once('open', async () => {
    // listen http express server
    app.listen(settings.PORT, '0.0.0.0', (err) => {
			if (err) return new Error(`error in starting server, error: ${err}`)
			else console.log(`server started on \nPORT: ${settings.PORT}\nURL: ${settings.serverUrl}`)
		})

    require('./webSocket/connect')()

    // require and use express http endPoints
    app.use('/user', require('./endPoints/user.js'))
    app.use('/chat', require('./endPoints/chat.js'))
    app.use('/docs', require('./endPoints/docs.js'))
    app.use('/task', require('./endPoints/task.js'))
	})

  // declare event on mongodb connection open
  mongoose.connection.emit('open')
}

init(settings)
