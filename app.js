const express = require('express')
const path = require('path')
const app = express()
const PORT = 4000
const server = app.listen(PORT, () => console.log('chat server on port 4000'))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

let socketsConnected = new Set()

io.on('connection', onConnection)

function onConnection(socket) {
    socketsConnected.add(socket.id)

    io.emit('clients-total', socketsConnected.size)

    socket.on('disconnect', () => {
        socketsConnected.delete(socket.id)
        io.emit('clients-total', socketsConnected.size)
    }) 

    socket.on('message', (data) => {
        // console.log(data)
        socket.broadcast.emit('chat-message', data)
      })

      socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
      })
}