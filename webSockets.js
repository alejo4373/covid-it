const WebSockets = require('ws')

const sendTo = (socket, data) => {
  socket.send(JSON.stringify(data))
}

const broadcast = (clients, data) => {
  clients.forEach(client => {
    if (client.readyState === WebSockets.OPEN) {
      sendTo(client, data)
    }
  })
}

function heartBeat() {
  this.isAlive = true
}

const init = ({ server, app }) => {
  const wss = new WebSockets.Server({ server })
  app.locals.clientSockets = wss.clients

  wss.on('connection', socket => {
    socket.isAlive = true
    socket.on('pong', heartBeat)

    socket.on('message', (data) => {
      const { type } = JSON.parse(data)
      switch (type) {
        case "REQUEST_ADD_NOTE":
          sendTo(socket, {
            type: "ADD_NOTE"
          })
          break;

        default:
          sendTo(socket, {
            type: "UNRECOGNIZED MESSAGE TYPE"
          })
      }
    })

    sendTo(socket, {
      type: "SUCCESSFULLY_CONNECTED"
    })
  })

  const THIRTY_SECONDS = 1000 * 10;

  const intId = setInterval(() => {
    wss.clients.forEach(client => {
      if (!client.isAlive) {
        client.terminate()
      } else {
        client.isAlive = false;
        client.ping()
      }
    })
  }, THIRTY_SECONDS)

  wss.on('close', (event) => {
    clearInterval(intId)
  })
}

module.exports = {
  init,
  broadcast
}
