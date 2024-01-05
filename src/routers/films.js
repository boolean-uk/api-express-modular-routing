const { films } = require('../../data/index')

let filmId = 0

const initFilmId = () => {
  films.forEach((film) => {
    if (film.id > filmId) {
      filmId = film.id
    }
  })
}

initFilmId()

const getNewFilmId = () => ++filmId

const duplicate = (title) => !!films.find((film) => film.title === title)
const findFilmById = (id) => films.find((film) => film.id === id)
const findFilmIndexById = (id) => films.find((film) => film.id === id)

class Film {
  constructor(title, director){
    this.id = getNewFilmId()
    this.title = title
    this.director = director
  }
}

const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
  res.json({ films })
)

router.post('/', (req, res) => {
  const { title } = req.body

  if (!title) {
    res.status(400).json( { "error": "Missing fields in request body"})
  }

  if (duplicate(title)) {
    res.status(409).json({ "error": "A user with the provded email already exists" })
  }

  const film = new film(email)
  if (film) {
    films.push(film)
    res.status(201).json({ film })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const film = findFilmById(Number(id))

  if (film) {
    res.json({ film })
  } else {
    res.status(404).json({ "error": "A film with the provided ID does not exist" })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const film = findFilmById(Number(id))
  const index = findFilmIndexById(Number(id))

  if (film) {
    films.splice(index, 1)
    res.json({ film })
  } else {
    res.status(404).json({ "error": "A film with the provided ID does not exist" })
  }
})

module.exports = router