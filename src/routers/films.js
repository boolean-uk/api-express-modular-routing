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

// GET by id
router.get('/:id', (req, res) => {
    const id = req.params.id

    const film = films.find((item) => item.id === Number(id))

    if(!film) {
        res.status(404).json({error: "A film with the provided id doesn't exist"})
    }

    res.json({film})
})

// DELETE by id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const film = films.find((item) => item.id === Number(id))
    films.splice(films.indexOf(film), 1)

    if(!film) {
        res.status(404).json({error: "A film with the provided id doesn't exist"})
    }

    res.json({film})

})

// PUT by id
router.put('/:id', (req, res) => {

    const id = req.params.id
    const film = films.find((item) => item.id === Number(id))
    if(!film) {
        res.status(404).json({error: "A film with the provided id doesn't exist"})
        return
    }

   let duplicate
   films.forEach((obj) => {
    if(obj.title === req.body.title){
        res.status(409).json({error: "A film with the provided title already exists"})
        duplicate = true
    }
   })
   if(duplicate) {
    return
    }

    
    const updatedFilm = film
    updatedFilm.title = req.body.title
    updatedFilm.director = req.body.director
    films.splice(films.indexOf(film), 1, updatedFilm)

    res.json({film: updatedFilm})
})




module.exports = router
