const express = require("express")
const router = express.Router()
let { films } = require("../../data")
let filmId = films.length

router.get("/", (req, res) => {
  const director = req.query.director
  if (director) {
    res.json(films.filter((film) => film.director === director))
  } else {
    res.json({ films })
  }
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const film = films.find((film) => film.id === id)
  if (!film) {
    return res.status(404).json({ error: "film not found" })
  }

  res.json({ film })
})

router.post("/", (req, res) => {
  filmId++

  const film = {
    ...req.body,
    id: filmId,
  }
  if (!film.title || !film.director) {
    return res
      .status(400)
      .json({ error: "A film requires a title and a director" })
  }

  const foundFilmWithTitle = films.find(
    (existing) => existing.title === film.title
  )
  if (foundFilmWithTitle) {
    return res
      .status(409)
      .json({ error: "a film with that title already exists" })
  }

  films.push(film)

  res.status(201).json({ film: film })
})

router.put("/:id", (req, res) => {
  const filmId = Number(req.params.id)
  let film = films.find((film) => film.id === filmId)
  if (!film) {
    return res.status(404).json({ error: "film not found" })
  }

  film = {
    ...film,
    ...req.body,
  }
  if (!film.title || !film.director) {
    return res
      .status(400)
      .json({ error: "A film requires a title and a director" })
  }
  const foundFilmWithTitle = films.find(
    (existing) => existing.title === film.title
  )
  if (foundFilmWithTitle) {
    return res
      .status(409)
      .json({ error: "a film with that title already exists" })
  }

  res.status(200).json({ film: film })
})

router.delete("/:id", (req, res) => {
  const filmId = Number(req.params.id)
  const film = films.find((film) => film.id === filmId)
  if (!film) {
    return res.status(404).json({ error: "film not found" })
  }
  films = films.filter((existing) => film.id !== existing.id)

  res.json({ film: film })
})

router.patch("/:id", (req, res) => {
  const filmId = Number(req.params.id)
  let film = films.find((film) => film.id === filmId)
  if (!film) {
    return res.status(404).json({ error: "film not found" })
  }

  film = {
    ...film,
    ...req.body,
  }
  const foundFilmWithTitle = films.find(
    (existing) => existing.title == film.title
  )
  if (foundFilmWithTitle) {
    return res
      .status(409)
      .json({ error: "a film with that title already exists" })
  }

  res.status(200).json({ film: film })
})

module.exports = router
