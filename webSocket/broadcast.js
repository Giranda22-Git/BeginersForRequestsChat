const broadcast = async function (to, message) {
  try {
    const clients = wsGlobal.clients
    if (to?.length) {
      for (const client of clients) {
        if (to.includes(client.login)) {
          client.send(message)
        }
      }
    }
    else {
      for (const client of clients) {
        client.send(message)
      }
    }
  }
  catch (err) {
    if (err) {
      console.log('broadcast webSocket Error: ', err)
    }
  }
}

module.exports = broadcast