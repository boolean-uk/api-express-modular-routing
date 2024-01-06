const express = require('express')
const router = express.Router()
const { films } = require('../../data/index')

// Global variables
let filmId = films.length + 1

// Retrieve a list of films
router.get('/', (req, res, next) => {
  res.status(200).json({
    films: films
  })
})

// Create a film
router.post('/', (req, res, next) => {
  const { title, director } = req.body

  const createdFilm = {
    id: filmId++,
    title,
    director
  }

  films.push(createdFilm)

  res.status(201).json({
    film: createdFilm
  })
})

module.exports = router
