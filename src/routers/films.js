const express = require("express");
const router = express.Router();

// Import data here...
const data = require("../../data");
const films = data.films;
 
// Write routes here...
router.get("/", (req, res) => {
    // 1. send back a response with all contacts
    res.json(films)
  })

// get by a film by id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const film= films.find(item => item.id === id)
    res.json(film)
  })

  // CREATE A FILM
router.post("/", (req, res) => {
    const film = (req.body)
    films.push(film)
    res.json(film)
})
// UPDATE A a FILM BY ID
router.patch("/:id", (req, res) => {
    
    const id = Number(req.params.id)
    let film = films.find(item => item.id === id)

    const updatedFilm= {
        "id": id,
        "title": req.body.title,
        "director": req.body.director
   }
   let index = films.indexOf(film)
   if (index !== -1) {
    films[index]= updatedFilm
  }
    res.json(updatedFilm)
  })

// DELETE A USER BY ID
router.delete("/:id", (req, res) => {
    
    const id = Number(req.params.id)
    const film = films.find(item => item.id === id)
    let index = films.indexOf(film);
    films.splice(index, 1)
    res.json(films)
  })

  module.exports = router;
  