//film router

//films from data
const { films } = require('../../data/index.js')

//create express router
const router = require('express').Router()

id = 4;

router.get('/', (req, res) => {
    res.send({ films })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = films.find((film) => film.id === id)
    res.send({film: found}) 
})

router.post('/', (req, res) => {
    id++;
    const newFilm = {...req.body, id}
    films.push(newFilm)
    res.status(201).json({film: newFilm})

})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = films.find((film) => film.id === id)
    const updatedFilm = {...found, ...req.body}
    films[films.indexOf(found)] = updatedFilm
    res.send({film: updatedFilm})
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = films.find((film) => film.id === id)
    const deletedFilm = films.splice(found,1)[0]
    res.send({film: deletedFilm})
})





module.exports = router;