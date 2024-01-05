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
        res.status(200).json({film: film})
    } else {
        res.status(404).json({error: "No such film with this id"})
    }
})

// Write routes here...
module.exports = router