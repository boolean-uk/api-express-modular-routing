const express = require('express')
const router = express.Router()

const { films } = require('../../data/index.js')

const findfilm = (req, res) => {
    const id = req.params.id
    const foundfilm = films.find((user) => user.id === Number(id))

    if(!foundfilm) {
        res.status(404).json({error: `No such user with ID: ${id}`})
    }
    return foundfilm
}


router.get('/', (req, res) => {
    return res.status(200).json({films})
})


router.post('/', (req, res) => {
    const newfilm = req.body
    const id = films.length + 1
    newfilm.id = id
    films.push(newfilm)
    return res.status(201).json({film: newfilm})
})


router.get('/:id', (req, res) => {
    const filmFound = findfilm(req, res)
    if(filmFound) {
        res.status(200).json({ film: filmFound})
    }
})
  

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const filmToDelete = films.findIndex((film) => film.id === id)

    if(filmToDelete !== -1) {
        const [deletedFilm] = films.splice(filmToDelete, 1)
        return res.status(200).json({film: deletedFilm})
    }

    return res.status(404).json({error: "Not Found"})
})


router.put('/:id', (req, res) => {
    const foundfilm = findfilm(req, res)
    const bodyValues = Object.values(req.body);

    if (bodyValues.some(value => !value)) {
      return res.json({ error: 'All values are required!' });
    }

    if(foundfilm) {
        Object.assign(foundfilm, req.body)
        return res.status(200).json({film: foundfilm})
    }
})


module.exports = router