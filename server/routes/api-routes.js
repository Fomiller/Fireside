const db = require('../models');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../config/passport');

module.exports = function (app) {
  // gets ALL USERS
  app.get("/api/users", (req, res) => {
    db.User.find({})
      .then(User => {
        res.json(User);
      })
      .catch(err => {
        res.json(err)
      });
  });

  //Route for registering new user
  app.post('/api/users', (req, res) => {
    Users = new User({ email: req.body.email, username: req.body.username });
    console.log("test",Users)

    User.register(Users, req.body.password, function (err, user) {
      if (err) {
        res.json({ success: false, message: "Your account could not be saved. Error: ", err })
      } else {
        res.json({ success: true, message: "Your account has been saved" })
      }
    });
  });

  // Route for loging in
  app.post('/api/login', (req, res) => {
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
  app.get('/api/users/:id', (req, res) => {
    db.User.findOne({ _id: req.params.id })
      .then(User => {
        res.json(User)
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Update a USER
  app.put('/api/users/:id', (req, res) => {
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

  // app.get('/api/users/friends', (req, res) => {
  //   db.User.find({})
  //   .populate('friends')
  //     .then(dbWorkout => {
  //       res.json(dbWorkout);
  //     })
  //     .catch(err => {
  //       res.json(err)
  //     });
  // });

  // app.put('/api/addfriend/:id', (req, res) => {
  //   db.User.findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.body } }, { new: true })
  //   .then(User => 
  //     res.json(User)
  //   )
  //   .catch(err => {
  //     // if an error occurs send the error to the client
  //     res.json(err);
  //   });
  // });

};