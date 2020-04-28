const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require("mongoose");
const passport = require('./config/passport');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/user", { useNewUrlParser: true });
 

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Setup app to use sessions to keep track of user's login status.
app.use(passport.initialize());
app.use(passport.session());


io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});



const PORT = process.env.PORT || 5000

app.use(require('./routes/users.js'));

server.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`)
});