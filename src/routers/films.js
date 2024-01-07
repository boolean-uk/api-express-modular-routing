const express = require('express')
const router = express.Router()
const { films } = require('../../data/index')
const ErrorConstructor = require('../helpers/ErrorConstructor')

// Global variables
let filmId = films.length + 1

// Global functions
const findFilmById = (id) => {
  const foundFilm = films.find((film) => film.id === Number(id))

  return foundFilm
}

const fieldsErrorHandling = (fields) => {
  fields.forEach((field) => {
    if (!field) {
      throw ErrorConstructor('Missing fields in request body', 400)
    }
  })

  return fields
}

// Retrieve a list of films
router.get('/', (req, res, next) => {
  res.status(200).json({
    films: films
  })
})

// Create a film
router.post('/', (req, res, next) => {
  try {
    const { title, director } = req.body

    fieldsErrorHandling([title, director])

    const createdFilm = {
      id: filmId++,
      title,
      director
    }

    films.push(createdFilm)

    res.status(201).json({
      film: createdFilm
    })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Get a film by ID
router.get('/:id', (req, res, next) => {
  const foundFilm = findFilmById(req.params.id)

  res.status(200).json({
    film: foundFilm
  })
})

// Delete a film by ID
router.delete('/:id', (req, res, next) => {
  const foundFilm = findFilmById(req.params.id)

  films.splice(
    films.findIndex((film) => film.id === foundFilm.id),
    1
  )

  res.status(200).json({ film: foundFilm })
})

// Update a film by ID
router.put('/:id', (req, res, next) => {
  const { title, director } = req.body

  const foundFilm = findFilmById(req.params.id)

  foundFilm.title = title
  foundFilm.director = director

  res.status(200).json({
    film: foundFilm
  })
})

module.exports = router
