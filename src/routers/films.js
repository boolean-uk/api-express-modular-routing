const express = require("express")
const router = express.Router()

const data = require('../../data/index')
const films = data.films

let lastfilmId = 4

const findFilm = (req, res) => {

    const filmId = Number(req.params.id);
  
    const foundFilm = films.find((film) => film.id === filmId);
  
    if (!foundFilm) {
      res.status(404).json({ error: `The film with ID: ${filmId} does not exist`});
    }
  
    return foundFilm;
};
router.get('/', (req, res) =>{
    res.status(200).json({films})
})




router.post('/', (req, res) =>{
    const body = req.body

    
    const newFilm = {
        ...body,
       id:  ++lastfilmId
        
    }
    films.push(newFilm)

    res.status(201).json({film: newFilm})
})

router.get('/:id', (req, res)=>{    
    const foundFilm = findFilm(req, res) 

    if(foundFilm){
        return res.status(200).json({film: foundFilm})
    }

})

router.delete('/:id', (req, res) =>{

    const filmToBeDeleted = findFilm(req, res)

    if(filmToBeDeleted){
        const filmToBeDeletedIndex= films.indexOf(filmToBeDeleted)
        films.splice(filmToBeDeletedIndex, 1)
    
        return res.status(200).json({film: filmToBeDeleted})
    }
})

router.put('/:id', (req, res) =>{

    const filmToBeEdited = findFilm(req, res)

    const {title, director} = req.body

    if(filmToBeEdited.title === title){
        return res.status(404).json({"error": "A film with the provided title already exists"})

    }

    filmToBeEdited.title = title
    filmToBeEdited.director = director
    return res.status(200).json({film: filmToBeEdited})
})

router.patch('/:id', (req, res)=>{
    
    const filmToBeEdited = findFilm(req, res)
    const {title, director} = req.body

    if(filmToBeEdited.title === title){
        return res.status(409).json({ "error": "Film with provided ID already exits" });
    }
    
    filmToBeEdited.title = title
    res.status(200).json({film: filmToBeEdited});

})
module.exports = router
