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

module.exports = router