// Import data here...
const express = require('express')
const {films} = require("../../data/index")
const router = express.Router()


// Get request for all films 
router.get("/", (req, res) => {
res.status(200).json({films: films})
})

// Get request for a single id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find((film) => film.id === id)

    if(film){
       return res.status(200).json({film: film})
    } else {
         return res.status(404).json({error: "No such film with this id"})
    }
})

// Post request to create new film
router.post("/", (req, res) => {
    const newFilm = req.body;
    newFilm.id = films.length + 1;
    films.push(newFilm);
    return res.status(201).json({film: newFilm})
})

// Put request to update film
router.put("/:id", (req, res) => {
const id = parseInt(req.params.id);
const foundFilm = films.find(film => film.id === id)

const updates = req.body;
Object.assign(foundFilm, updates)

return res.status(200).json({film: foundFilm})
})


// Write routes here...
module.exports = router