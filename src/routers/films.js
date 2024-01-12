// Import data here...
const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const films = data.films;

const findFilm = (req, res) => {
  const filmId = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === filmId);
  if (!foundFilm) {
    res.status(404).json({ message: `Film with ID ${filmId} not found ` });
  }
  return foundFilm;
};
// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ films: films });
});

router.post("/", (req, res) => {
  const filmInfo = req.body;

  const newFilm = {
    id: films.length + 1,
    title: filmInfo.title,
    director: filmInfo.director,
  };

  films.push(newFilm);
  res.status(201).json({ newFilm });
});

router.get("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);

  res.status(200).json({ foundFilm });
});

module.exports = router;
