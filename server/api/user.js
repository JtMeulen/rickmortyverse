const express = require('express');
const router = express.Router()
const passport = require("passport");

const User = require('../models/User');

// just to test and see the users easily, REMOVE
router.get('/', (req, res) => {
  console.log('currentUser', res.locals.currentUser)
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
});

router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, (user) => {
        return res.json({
          username: user.username,
          favorites: user.favorites
        })
      });
    })
    .catch(err => res.status(401).json({ error: err.message }))
});

router.post('/login', (req, res) => {
  passport.authenticate("local")(req, res, (user) => {
    return res.json({
      username: user.username,
      favorites: user.favorites
    })
  });
})

router.post('/logout', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
})

module.exports = router;
