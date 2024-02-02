const { films } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

const findFilm = (id) => {
    return films.find(user => user.id === parseInt(id))
}

router.get('/', (req, res) => {
    res.json({ films })
})
