const express = require("express")
const router = express.Router()
const { films } = require("../../data/index")
const { getNewFilmDetails, createFilm, formatFilm, findfilm } = require("../functions/filmFunction.js")

let currentFilmId = 4

// GET ALL FILMS
router.get("/", (req, res) => {
    return res.status(200).json({films})
})

// CREATE A FILM
router.post("/", (req, res) => {
    const details = getNewFilmDetails(req)
    const newFilm = createFilm(details, currentFilmId, films)
    return res.status(201).json(formatFilm(newFilm))
})

// GET FILM BY ID
router.get("/:id", (req, res) => {
    const film = findfilm(req, res, films)
    return res.status(200).json(formatFilm(film))
})

module.exports = router