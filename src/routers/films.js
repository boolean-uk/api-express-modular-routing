const express = require('express')
const router = express.Router()


let id = 5
const films = [
    {
        id: 1,
        title: "Bonnie and Clyde",
        director: "Arthur Penn"
    },
    {
        id: 2,
        title: "Shawshank Redemption",
        director: "Frank Darabont"
    },
    {
        id: 3,
        title: "Spider-Man: Far From Home",
        director: "Jon Watts"
    },
    {
        id: 4,
        title: "Green Mile",
        director: "Frank Darabont"
    }
]

// GET all films
router.get('/', (req, res) => {
    res.json({films})
})


// POST films
router.post('/', (req, res) => {
    const {title, director} = req.body

    if (title === undefined || director === undefined) {
        res.status(400).json({error: "Missing fields in request body"})
        return
    }

    let duplicate
    films.forEach((obj) => {
        if(obj.title === title){
            res.status(409).json({error: "A film with the provided title already exists"})
            duplicate = true
        }
    })
    if(duplicate) {
        return
    }
    const film = {
        id: id++, 
        title, 
        director
    }
    
    films.push(film)
    res.status(201).json({film})

})


module.exports = router
