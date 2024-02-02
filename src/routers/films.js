const { films } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

const findFilm = (id) => {
    return films.find(film => film.id === parseInt(id))
}

router.get('/', (req, res) => {
    res.json({ films })
})

router.post('/', (req, res) => {
    const body = req.body
    const newFilm = { id: films.length + 1, ...body }
    films.push(newFilm)
    res.status(201).json({ film: newFilm })
})

router.get('/:id', (req, res) => {
    const film = findFilm(req.params.id)
    if (film) {
        res.json({ film })
    } else {
        res.status(404).json({ error: 'film not found' })
    }
})

router.delete('/:id', (req, res) => {
    const film = findFilm(req.params.id)
    if (film) {
        films.splice(films.indexOf(film), 1)
        res.json({ film })
    } else {
        res.status(404).json({ error: 'film not found' })
    }
})

router.put('/:id', (req, res) => {
    const film = findFilm(req.params.id)
    if (film) {
        Object.assign(film, req.body)
        res.json({ film })
    } else {
        res.status(404).json({ error: 'film not found' })
    }
})

module.exports = router;