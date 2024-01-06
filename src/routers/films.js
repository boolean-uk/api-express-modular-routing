const express = require('express')
const router = express.Router()
const { films } = require('../../data/index')

// Global variables
const filmId = films.length + 1

// Retrieve a list of films
router.get('/', (req, res, next) => {
  res.status(200).json({
    films: films
  })
})

module.exports = router
