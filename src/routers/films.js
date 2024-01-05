const express = require('express')
const router = express.Router() 
const data = require('../../data/index')
const films = data.films

router.get("/", (req, res) => (res.json({"films": films})))

router.post("/", (req, res) => {
    const id = films.length + 1
    const newFilm = req.body
    newFilm.id = id
    films.push(newFilm)
    return res.status(201).json({"film": newFilm})
} )
module.exports = router