const express = require('express')
const router = express.Router()

const {films} = require('../../data/index.js')

const findFilm = (req, res) => {
    const filmId = Number(req.params.id)
    const foundFilm = films.find(film => film.id === filmId)
    if (!foundFilm) {
      res
      .status(404)
      .json({ message: `Film with the ID ${filmId} does not exist!` })
    }
    return foundFilm
}

router.get('/', (req, res) => {
  res.status(200).json({films})
})

router.get('/:id', (req, res) => {
  const foundFilm = findFilm(req, res)
  res.status(200).json({film: foundFilm})
})

module.exports = router