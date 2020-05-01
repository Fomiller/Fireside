const db = require('../models');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../config/passport');

// Gets all users.
router.get("/api/users", (req, res) => {
  db.User.find({})
    .then(User => {
      res.json(User);
    })
    .catch(err => {
      res.json(err)
    });
});

// Route for registering new user.
router.post('/api/users', (req, res) => {
  Users = new User(req.body);

  User.register(Users, req.body.password, function (err, user) {
    if (err) {
      res.json({ success: false, message: "Your account could not be saved. Error: ", err })
    } else {
      res.json({ success: true, message: "Your account has been saved" })
    }
  });
});

// Route for loging in.
router.post('/api/login', passport.authenticate('local'), async (req, res) => {
  if (req.user) {
    const user = await db.User.findOne({ username: req.user.username })
    console.log('SUCCESS!!!');
    return res.send(user)
  } else {
    console.log('username or password incorrect');
    res.json({ success: false, message: 'username or password incorrect' })
  }
});

router.get('/api/loggedinuser', (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  return res.send(null);
});

// Get a single USER by id.
router.get('/api/users/:id', (req, res) => {
  db.User.findOne({ _id: req.params.id })
    .then(User => {
      res.json(User)
    })
    .catch(err => {
      res.json(err);
    });
});

// Update a USER.
router.put('/api/users/:id', (req, res) => {
  db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(User =>
      res.json(User)
    )
    .catch(err => {
      // If an error occurs send the error to the client.
      res.json(err);
    });
});

// Get saved messages.
router.get('/api/messages/:room?', (req, res) => {
  db.Chat.find({ room: req.params.room })
    .then(chat => {
      res.send(chat);
    })
    .catch(err => {
      res.send(err);
    });
});

// Express serve up index.html file if it doesn't recognize route
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

module.exports = router;