const { films } = require('../../data')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({films})
})

router.get('/:id', (req, res) => {
    const film = films.find((obj) => obj.id === Number(req.params.id))
    if (film === undefined) {
        res.status(404).json({error: "A film with provided ID does not exist"})
    }
    else {
        res.status(200).json({ film })
    }
})

router.post('/', (req, res) => {
    const expectedKeys = ["title", "director"]
    const dontMatch = expectedKeys.find((item) => !Object.keys(req.body).includes(item))
    const foundTitle = films.find((obj) => obj.title === req.body.title)
    if (dontMatch) {
        res.status(400).json({ error: "Missing fields in request body" })
    } else if (foundTitle !== undefined) {
        res.status(409).json({ error: 'A film with the provided title already exists' })
    } else {
    const id = films[films.length - 1].id +1
    const film = {...req.body, id}
    films.push(film)
    res.status(201).json({film})
    }
})

router.put('/:id', (req, res) => {
    const expectedKeys = ["title", "director"]
    const dontMatch = expectedKeys.find((item) => !Object.keys(req.body).includes(item))
    const foundTitle = films.find((obj) => obj.title === req.body.title)
    const film = films.find((obj) => obj.id === Number(req.params.id))
    if(film === undefined) {
        res.status(404).json({ error: "A film with provided ID does not exist" })
    } else if (foundTitle !== undefined) {
        res.status(409).json({ error: "A film with the provided title already exists" })
    } else {
        Object.keys(req.body).forEach((prop) => film[prop] = req.body[prop])
        res.status(200).json({film})
    }
})

router.delete('/:id', (req, res) => {
    const film = films.find((obj) => obj.id === Number(req.params.id))
    const index = films.indexOf(film)
    if(film === undefined) {
        res.status(404).json({error: "A film with provided ID does not exist" })
    } else {
        films.splice(index, 1)
        res.status(200).json({film})
    }
})

module.exports = router