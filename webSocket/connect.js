const url = require('url')
const {WebSocketServer} = require('ws')

function init () {
  global.wsGlobal = new WebSocketServer({
    port: 2222
  })

  wsGlobal.on('connection', async function (ws, req) {
    try {
      const urlData = url.parse(req.url, true)

      if (!urlData.query?.login) {
        console.log('Не передан параметр логин')
        return
      }
      console.log({urlData})

      ws.login = urlData.query.login

      console.log(wsGlobal.clients)
    }
    catch (error) {
      console.log({error})
    }
  })
}

module.exports = init