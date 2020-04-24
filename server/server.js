const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const router = require('./router');
const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, cb) => {
    
    const { error, user } = ''; // TODO: add user in here

    if (error) return cb(error);
    
    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    cb()
  });

  socket.on('sendMessage', (message, cb) => {
    const user = ''; // TODO: get user in here

    io.to(user.room).emit('message', { user: user.name, text: message });

    cb();
  });

  socket.on('disconnect', () => {
    const user = ''; // TODO: get user in here

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    }
  });

})

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));