const { films } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

const findFilm = (id) => {
    return films.find(user => user.id === parseInt(id))
}

router.get('/', (req, res) => {
    res.json({ films })
})

router.post('/', (req, res) => {
    const body = req.body
    const newFilm = { id: films.length + 1, ...body }
    films.push(newFilm)
    res.status(201).json({ user: newFilm })
})
