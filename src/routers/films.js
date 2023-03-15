const { films } = require('../../data')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({films})
})

router.get('/:id', (req, res) => {
    const film = films.find((obj) => obj.id === Number(req.params.id))
    res.json({ film })
})

router.post('/', (req, res) => {
    const id = films[films.length - 1].id +1
    const film = {...req.body, id}
    films.push(film)
    res.status(201).json({film})
})

router.put('/:id', (req, res) => {
    const film = films.find((obj) => obj.id === Number(req.params.id))
    Object.keys(req.body).forEach((prop) => film[prop] = req.body[prop])
    res.status(200).json({film})
})

router.delete('/:id', (req, res) => {
    const film = films.find((obj) => obj.id === Number(req.params.id))
    const index = films.indexOf(film)
    films.splice(index, 1)
    res.status(200).json({film})
})

module.exports = router