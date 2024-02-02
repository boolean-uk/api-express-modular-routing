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

router.get('/:id', (req, res) => {
    const user = findFilm(req.params.id)
    if (user) {
        res.json({ user })
    } else {
        res.status(404).json({ error: 'user not found' })
    }
})

router.delete('/:id', (req, res) => {
    const user = findFilm(req.params.id)
    if (user) {
        films.splice(films.indexOf(user), 1)
        res.json({ user })
    } else {
        res.status(404).json({ error: 'user not found' })
    }
})

router.put('/:id', (req, res) => {
    const user = findFilm(req.params.id)
    if (user) {
        Object.assign(user, req.body)
        res.json({ user })
    } else {
        res.status(404).json({ error: 'user not found' })
    }
})
