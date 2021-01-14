const express = require('express');
const router = express.Router()
const axios = require('axios');

const { isLoggedIn } = require('../middleware');
const User = require('../models/User');
const BASE_URL = 'https://rickandmortyapi.com/api/character/'

router.get('/', isLoggedIn, (req, res) => {
  const favorites = res.locals.currentUser.favorites;

  // If favorites are empty, dont bother making a request
  if(!favorites.length) {
    return res.json({
      authenticated: true,
      characters: []
    });
  }

  axios.get(`${BASE_URL}/${favorites}`)
    .then(response => {
      // When there is only 1 favorite, it doesn't come back as an array
      // so we create an array ourself
      let characters = response.data;
      if(!Array.isArray(characters)) {
        characters = new Array(characters);
      }

      return res.json({
        authenticated: true,
        characters: characters
      })
    })
    .catch(err => console.log(err))
});

router.put('/add', isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    res.locals.currentUser._id, 
    { $addToSet: { "favorites": req.body.id }}, 
    { new: true }, 
    (err, result) => res.json({ favorites: result.favorites})
  )
});

router.delete('/delete', isLoggedIn, (req, res) => {
  User.findByIdAndUpdate(
    res.locals.currentUser._id, 
    { $pull: { "favorites": req.body.id }}, 
    { new: true }, 
    (err, result) => res.json({ favorites: result.favorites})
  )
})

module.exports = router;
