const express = require('express');
const router = express.Router()
const axios = require('axios');

const BASE_URL = 'https://rickandmortyapi.com/api/character/'

router.get('/', (req, res) => {
  if(!Boolean(res.locals.currentUser)) {
    return res.status(403).json({ authenticated: false })
  }

  const page = req.query.page || 1;

  axios.get(`${BASE_URL}?page=${page}`)
    .then(response => {
      return res.json({
        authenticated: true,
        pages: response.data.info.pages,
        currentpage: page,
        characters: response.data.results
      })
    })
    .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
  if(!Boolean(res.locals.currentUser)) {
    return res.status(403).json({ authenticated: false })
  }

  const character_id = req.params.id

  axios.get(`${BASE_URL}/${character_id}`)
    .then(response => {
      return res.json({
        authenticated: true,
        character: response.data
      })
    })
    .catch(err => console.log(err))
});

module.exports = router;
