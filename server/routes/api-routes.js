const db = require('../models');
console.log(db.User);
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../config/passport');


  // gets ALL USERS
  router.get("/api/users", (req, res) => {
    db.User.find({})
      .then(User => {
        res.json(User);
      })
      .catch(err => {
        res.json(err)
      });
  });

  //Route for registering new user
  router.post('/api/users', (req, res) => {
    console.log('TEST');
    Users = new User({ email: req.body.email, username: req.body.username });

    User.register(Users, req.body.password, function (err, user) {
      if (err) {
        res.json({ success: false, message: "Your account could not be saved. Error: ", err })
      } else {
        res.json({ success: true, message: "Your account has been saved" })
      }
    });
  });

  // Route for loging in
  router.post('/api/login', (req, res) => {
    if (!req.body.username) {
      res.json({ success: false, message: "Username was not given" })
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
      } else {
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            res.json({ success: false, message: err })
          } else {
            if (!user) {
              res.json({ success: false, message: 'username or password incorrect' })
            } else {
              //User successfully logged in.
              res.json({ success: true })
            }
          }
        })(req, res);
      }
    }
  });

  // get a single USER by id
  router.get('/api/users/:id', (req, res) => {
    db.User.findOne({ _id: req.params.id })
      .then(User => {
        res.json(User)
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Update a USER
  router.put('/api/users/:id', (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(User =>
        res.json(User)
      )
      .catch(err => {
        // if an error occurs send the error to the client
        res.json(err);
      });
  });



  // Routes to add and get friends for a user

  // router.get('/api/users/friends', (req, res) => {
  //   db.User.find({})
  //   .populate('friends')
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       res.json(err)
  //     });
  // });

  // router.put('/api/addfriend/:id', (req, res) => {
  //   db.User.findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.body } }, { new: true })
  //   .then(User => 
  //     res.json(User)
  //   )
  //   .catch(err => {
  //     // if an error occurs send the error to the client
  //     res.json(err);
  //   });
  // });

  module.exports = router;