const express = require('express')
const router = express.Router()
const { films } = require('../../data/index')
const ErrorConstructor = require('../helpers/ErrorConstructor')
const FieldsErrorHandler = require('../helpers/FieldsErrorHandler')

// Global variables
let filmId = films.length + 1

// Global functions
const findFilmById = (id) => {
  const foundFilm = films.find((film) => film.id === Number(id))

  if (!foundFilm) {
    throw ErrorConstructor('A film with provided ID does not exist', 404)
  }

  return foundFilm
}

const titleErrorHandling = (title) => {
  const foundTitle = films.find((film) => film.title === title)

  if (foundTitle) {
    throw ErrorConstructor('A film with the provided title already exists', 409)
  }

  return
}

// Retrieve a list of films
router.get('/', (req, res, next) => {
  const { director } = req.query

  if (director) {
    const filmsByDirector = films.filter((film) =>
      film.director.includes(director)
    )

    return res.status(200).json({ films: filmsByDirector })
  }

  res.status(200).json({
    films: films
  })
})

// Create a film
router.post('/', (req, res, next) => {
  try {
    const { title, director } = req.body

    // Errors handlings
    FieldsErrorHandler([title, director])
    titleErrorHandling(title)

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
  try {
    const foundFilm = findFilmById(req.params.id)

    res.status(200).json({
      film: foundFilm
    })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Delete a film by ID
router.delete('/:id', (req, res, next) => {
  try {
    const foundFilm = findFilmById(req.params.id)

    films.splice(
      films.findIndex((film) => film.id === foundFilm.id),
      1
    )

    res.status(200).json({ film: foundFilm })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Update a film by ID
router.put('/:id', (req, res, next) => {
  try {
    const { title, director } = req.body

    // Error handlings
    FieldsErrorHandler([title, director])
    titleErrorHandling(title)

    const foundFilm = findFilmById(req.params.id)

    foundFilm.title = title
    foundFilm.director = director

    res.status(200).json({
      film: foundFilm
    })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Update a film by id using patch
router.patch('/:id', (req, res, next) => {
  try {
    const { title, director } = req.body

    // Error handlings
    if (!title && !director) {
      return res
        .status(400)
        .json({ error: 'Missing fields in the request body' })
    }

    titleErrorHandling(title)

    const foundFilm = findFilmById(req.params.id)

    if (title) {
      foundFilm.title = title
    }

    if (director) {
      foundFilm.director = director
    }

    res.status(200).json({
      film: foundFilm
    })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

module.exports = router
