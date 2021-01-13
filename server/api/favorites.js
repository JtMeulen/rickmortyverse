const express = require('express');
const router = express.Router()
const axios = require('axios');

const User = require('../models/User');
const BASE_URL = 'https://rickandmortyapi.com/api/character/'

router.get('/', (req, res) => {
  if(!Boolean(res.locals.currentUser)) {
    return res.status(403).json({ authenticated: false })
  }

  const favorites = res.locals.currentUser.favorites;

  axios.get(`${BASE_URL}/${favorites}`)
    .then(response => {
      return res.json({
        authenticated: true,
        characters: response.data
      })
    })
    .catch(err => console.log(err))
});

router.put('/add', (req, res) => {
  if(!Boolean(res.locals.currentUser)) {
    return res.status(403).json({ authenticated: false })
  }

  User.findByIdAndUpdate(
    res.locals.currentUser._id, 
    { $addToSet: { "favorites": req.body.id }}, 
    { new: true }, 
    (err, result) => res.json({ favorites: result.favorites})
  )
});



router.delete('/delete', (req, res) => {
  if(!Boolean(res.locals.currentUser)) {
    return res.status(403).json({ authenticated: false })
  }

  User.findByIdAndUpdate(
    res.locals.currentUser._id, 
    { $pull: { "favorites": req.body.id }}, 
    { new: true }, 
    (err, result) => res.json({ favorites: result.favorites})
  )
})

module.exports = router;
