const express = require('express')
const router = express.Router()

const films = [
  {
    id: 1,
    title: 'Bonnie and Clyde',
    director: 'Arthur Penn'
  },
  {
    id: 2,
    title: 'Reservoir Dogs',
    director: 'Quentin Tarantino'
  },
  {
    id: 3,
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    id: 4,
    title: 'Django Unchained',
    director: 'Quentin Tarantino'
  }
]
let id = 5
const findById = (id) => {
  return films.find((film) => film.id === id)
}
router.get('/', (req, res) => {
  res.send({ films })
})
router.post('/', (req, res) => {
  const body = req.body
  body.id = id++
  films.push(body)
  res.status(201).send({ film: body })
})
router.get('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const film = findById(idNum)
  res.send({ film })
})
router.delete('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const filmIndex = films.findIndex((film) => film.id === idNum)
  const film = findById(idNum)
  films.splice(filmIndex, 1)
  res.send({ film })
})
router.put('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const body = req.body
  const filmIndex = films.findIndex((film) => film.id === idNum)
  const film = findById(idNum)
  films[filmIndex] = body
  films[filmIndex].id = film.id
  res.send({ film: films[filmIndex] })
})
router.patch('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const body = req.body
  const film = findById(idNum)
  const bodyArray = Object.entries(body)
  if (!Object.keys(body)[0]) {
    res.status(400).send({ error: 'Missing fields in request body' })
  } else if (!film) {
    res.status(404).send({ error: 'A film with provided ID does not exist' })
  } else if (films.find((film) => film.title === body.title)) {
    res
      .status(409)
      .send({ error: 'A film with the provided title already exists' })
  } else {
    bodyArray.forEach((array) => {
      const filmKeys = { ...film, [array[0]]: array[1] }
      console.log(filmKeys)
      res.status(200).send({ film: filmKeys })
    })
  }
})
router.get('/', (req, res) => {
  const director = req.query
  console.log(director)
  director.split('_').join(' ')
  console.log(director)
  const filteredArray = films.filter((film) => film.director === director)
  console.log(filteredArray)
  res.send({ films: filteredArray })
})

module.exports = router
