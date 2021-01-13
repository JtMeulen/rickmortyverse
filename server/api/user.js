const express = require('express');
const router = express.Router()
const passport = require("passport");

const User = require('../models/User');

router.get('/', (req, res) => {
  if(res.locals.currentUser) {
    return res.json({
      auth: true,
      username: res.locals.currentUser.username,
      favorites: res.locals.currentUser.favorites
    })
  } else {
    return res.json({ auth: false })
  }
});

router.post('/register', (req, res, next) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        return res.json({
          username: req.user.username,
          favorites: req.user.favorites
        })
      });
    })
    .catch(err => next(err))
});

router.post('/login', (req, res) => {
  passport.authenticate("local")(req, res, () => {
    return res.json({
      username: req.user.username,
      favorites: req.user.favorites
    })
  });
})

router.get('/logout', (req, res) => {
  req.logout();
  return res.json({ auth: false });
})

module.exports = router;
