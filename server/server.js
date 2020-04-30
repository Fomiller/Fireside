const express = require("express");
const app = express();
const passport = require('./config/passport');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// Socket.io setup
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// require Mongoose
const mongoose = require("mongoose");

// Connecting to mongoose.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/firesideDB", { useNewUrlParser: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup app to use sessions to keep track of user's login status.
app.use(passport.initialize());
app.use(passport.session());

const { Chat } = require("./models/Chat");

// Run when client connects.
io.on('connection', (socket) => {

  // Run when client joins a room.
  socket.on('join', ({ name, room }, callback) => {
    // Returns a user object with name and room.
    const { user } = addUser({ id: socket.id, name, room });

    // Adds user to room.
    socket.join(user.room);

    // Sends message to user after user joins room.
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    // Sends message to all users in room indicating a new user has joined.
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    // Returns all users in the room.
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    // does not do anything yet.
    callback();
  });

  // Runs when client sends a message.
  socket.on('sendMessage', (message, callback) => {
    // Gets user by socket id
    const user = getUser(socket.id);
    // Sends message to room from user.
    io.to(user.room).emit('message', { user: user.name, text: message });
    // Runs function on client side to setMessage state.
    callback();
  });

  // When user disconnects remove from room.
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      // Send message to room that user has left.
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

// Dont know what this does?
//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Allow the app to use the api routes
app.use(require('./routes/api-routes.js'));

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server Running at ${PORT}`));



// io.on("connection", socket => {

//   socket.on("Input Chat Message", msg => {

//     connect.then(db => {
//       try {
//           let chat = new Chat({ message: msg.chatMessage, sender:msg.userID, type: msg.type })

//           chat.save((err, doc) => {
//             if(err) return res.json({ success: false, err })

//             Chat.find({ "_id": doc._id })
//             .populate("sender")
//             .exec((err, doc)=> {

//                 return io.emit("Output Chat Message", doc);
//             })
//           })
//       } catch (error) {
//         console.error(error);
//       }
//     })
//    })
// })