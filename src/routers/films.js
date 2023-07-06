const express = require('express')
const router = express.Router()
const data = require('../../data/index.js')
const films = require('../../data/index.js').films

// GET all films
router.get('/', (req, res) => {
  res.status(200).json({ films })
})

// POST a new film
router.post('/', (req, res) => {
  if (req.body.title === undefined || req.body.director === undefined) {
    res.status(400).json({ error: 'Missing fields in the request body' })
  } else if (films.find((film) => film.title === req.body.title)) {
    res.status(409).json({ error: 'A film with the provided title already exists'})
  } else {
    let id = films[films.length - 1].id + 1
    const newFilm = { ...req.body, id }
    films.push(newFilm)
    res.status(201).json({ film: newFilm })
  }
})

// GET a film by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const filmFound = films.find((film) => film.id === id)
  if (filmFound) {
    res.status(200).json({ film: filmFound })
  } else {
    res.status(404).json({ error: 'A film with the provided ID does not exist' })
  }
})

// DELETE a film by ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const filmIndex = films.findIndex((film) => film.id === id)
  if (filmIndex !== -1) {
    const deletedfilm = films.splice(filmIndex, 1)[0]
    res.status(200).json({ film: deletedfilm })
  } else {
    res.status(404).json({ error: 'A film with the provided ID does not exist'})
  }
})

// PUT update a film by ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedFilm = { ...req.body, id }
  const filmIndex = films.findIndex((film) => film.id === id)

  if (filmIndex === -1) {
    res.status(404).json({ error: 'A film with the provided ID does not exist' })
  }
  if (films.findIndex((film) => film.title === req.body.title) !== -1) {
    res.status(409).json({ error: 'A film with the provided title already exists'})
  }
  films[filmIndex] = updatedFilm
  res.status(200).json({ film: updatedFilm })
})

// PATCH update specific film properties by ID
router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const filmIndex = films.findIndex((film) => film.id === id)

  if (
    req.body.title === undefined ||
    req.body.director === undefined
  ) {
    res.status(400).json({ error: 'Missing fields in the request body' })
  }

  if (filmIndex === -1) {
    res.status(404).json({ error: 'A film with the provided ID does not exist' })
    return
  }

  const { title, director } = req.body
  const existingFilmIndex = films.findIndex((film) => film.title === title && film.id !== id)

  if (existingFilmIndex !== -1) {
    res.status(409).json({ error: 'A film with the provided title already exists' })
    return
  }

  const updatedFilm = {
    id,
    title: title || films[filmIndex].title,
    director: director || films[filmIndex].director
  }

  films[filmIndex] = updatedFilm
  res.status(200).json({ film: updatedFilm })
})

module.exports = router;