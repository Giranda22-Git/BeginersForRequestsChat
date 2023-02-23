const ws = require('./connection')

const broadcast = async function (message) {
  try {
    const clients = ws.clients

    for (const client of clients) {
      client.send(message)
    }
  }
  catch (err) {
    if (err) {
      console.log('broadcast webSocket Error: ', err)
    }
  }
}

module.exports = broadcast