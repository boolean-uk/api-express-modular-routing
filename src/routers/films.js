const express = require('express');
const { films } = require('../../data/index')
const router = express.Router();

let id = 5

// Get all films
router.get("/", (req, res) => {
    res.json({ films })
})

// Create a film
router.post("/", (req, res) => {
    const body = req.body
    const newFilm = {id: id, ...body}
    films.push(newFilm)
    id++

    return res.status(201).send( {film: newFilm})
})

// Get film by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const film = films.find((film) => film.id === id)

    if (film) {
        return res.send({ film })
    } else {
        return res.status(404).send({error: "A film with provided ID does not exist"})
    }
})

// Delete film by id
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    let filmIndex = -1
    const film = films.find((film, index) => {
        if (film.id === id) {
            filmIndex = index
            return true
        } else {
            return false
        }
    })

    if (film) {
        films.splice(filmIndex, 1)
        return res.send({ film })
    } else {
        return res.status(404).send({error: "A film with provided ID does not exist"})
    }
})

// Update a film by id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body

    let updatedFilm = films.find((film) => film.id === id)
    Object.assign(updatedFilm, body)
    return res.send({film: updatedFilm})
})

// PATCH Update a film by ID
router.patch('/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    const checkId = films.find((film) => film.id === id)
    const checkTitle = films.find((film) => film.title === body.title)

    if (body.title.length === 0 && body.director.length === 0) {
        return res.status(400).send({ error: "Missing fields in the request body"})
    }
    if (!checkId) {
        return res.status(404).send({ error: "A film with the provided ID does not exist"})
    }
    if (checkTitle) {
        return res.status(409).send({ error: "A film with the provided title already exists"})
    }
    if (body.title.length !== 0 || body.director.length !== 0) {
        if (body.title.length !== 0) {
            
        }
    }

})

module.exports = router