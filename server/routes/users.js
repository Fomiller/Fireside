const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../config/passport');

//Route for registering new user
router.post('/register', (req, res) => {
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
router.post('/login', (req, res) => {
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
                        res.json({ success: true })
                    }
                }
            })(req, res);
        }
    }
});

module.exports = router;
