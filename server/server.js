const express = require("express");
const app = express();
// Socket.io setup
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// require Mongoose
const mongoose = require("mongoose");

// Dont know what these are used for
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// dont know what this is
// const config = require("./config/key");


// Connecting to mongoose.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/firesideDB", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// dont know what this is used for
// app.use(cookieParser());

const { Chat } = require("./models/Chat");

// Allow the app to use the api routes
require('./routes/api-routes.js')(app);


io.on("connection", socket => {

  socket.on("Input Chat Message", msg => {

    connect.then(db => {
      try {
          let chat = new Chat({ message: msg.chatMessage, sender:msg.userID, type: msg.type })

          chat.save((err, doc) => {
            if(err) return res.json({ success: false, err })

            Chat.find({ "_id": doc._id })
            .populate("sender")
            .exec((err, doc)=> {

                return io.emit("Output Chat Message", doc);
            })
          })
      } catch (error) {
        console.error(error);
      }
    })
   })

})


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

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});