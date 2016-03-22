const express = require('express')
const mainServer = require('./server')

const server = express()
const port = process.env.PORT || 8000

server.set('port', port)

mainServer.static(server)

server.listen(port, () => {
  console.error('Server is up, visit  http://localhost:' + port + ' !')
})
