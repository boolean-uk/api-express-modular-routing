const express = require("express")
const router = express.Router()
const { films } = require("../../data/index")
const { getNewFilmDetails, createFilm, formatFilm, findfilm, deleteFilm, getDirectorFilms } = require("../functions/filmFunction.js")

let currentFilmId = 4

// GET ALL FILMS
router.get("/?", (req, res) => {
    const director = req.query.director
    if (director) {
        getDirectorFilms(res, director, films)
    }
    return res.status(200).json({films})
})

// CREATE A FILM
router.post("/", (req, res) => {
    const details = getNewFilmDetails(req, res, films)
    if (!details.title || !details.director) return res.status(400).json({"error": "Missing fields in request body"})
    const newFilm = createFilm(details, currentFilmId, films)
    return res.status(201).json(formatFilm(newFilm))
})

// GET FILM BY ID
router.get("/:id", (req, res) => {
    const film = findfilm(req, res, films)
    return res.status(200).json(formatFilm(film))
})

// DELETE FILM BY ID
router.delete("/:id", (req, res) => {
    const filmToDelete = findfilm(req, res, films)
    deleteFilm(filmToDelete, films)
    return res.status(200).json(formatFilm(filmToDelete))
})

// UPDATE FILM BY ID
router.put("/:id", (req, res) => {
    const filmToUpdate = findfilm(req, res, films)
    const details = getNewFilmDetails(req, res, films)
    filmToUpdate.title = details.title
    filmToUpdate.director = details.director
    return res.status(200).json(formatFilm(filmToUpdate))
})

module.exports = router