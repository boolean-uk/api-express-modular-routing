const express = require("express")
const router = express.Router()

const data = require('../../data/index')
const films = data.films

let lastfilmId = 4

router.get('/', (req, res) =>{
    res.status(200).json(films)
})

router.post('/', (req, res) =>{
    const body = req.body

    const newFilm = {
        ...body,
       id:  ++lastfilmId
        
    }
    films.push(newFilm)

    res.status(201).json(newFilm)
})

router.get('/:id', (req, res)=>{
    const filmId = Number(req.params.id)
    
    const foundFilm = films.find((film)=> film.id === filmId)

    if(!foundFilm){
        res.status(400).json({"error": "film not found"})
    }

    return res.status(200).json(foundFilm)
})

router.delete('/:id', (req, res) =>{
    const filmId = Number(req.params.id)
    const filmToBeDeleted = films.find((film)=> film.id === filmId)

    if(!filmToBeDeleted){
       return  res.status(404).json({"error": "Film with the provided id doesnt exist"})
    }
    const filmToBeDeletedIndex= films.indexOf(filmToBeDeleted)
    films.splice(filmToBeDeletedIndex, 1)

    return res.status(200).json(filmToBeDeleted)

})

router.put('/:id', (req, res) =>{
    const filmId = Number(req.params.id)
    const filmToBeEdited = films.find((film)=> film.id === filmId)

    if(!filmToBeEdited){
        return  res.status(404).json({"error": "A film with the provided ID does not exist"})
    }

    const {title, director} = req.body

    if(filmToBeEdited.title === title){
        return res.status(404).json({"error": "A film with the provided title already exists"})

    }

    filmToBeEdited.title = title
    filmToBeEdited.director = director
    return res.status(200).json(filmToBeEdited)
})
module.exports = router
