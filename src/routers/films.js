// Import data here...
const express = require("express");

const router = express.Router();

const { films } = require("../../data/index.js");

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
  res.status(200).json({ films });
});

router.post("/", (req, res) => {
  const filmInfo = req.body;

  const newFilm = {
    id: films.length + 1,
    title: filmInfo.title,
    director: filmInfo.director,
  };

  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

router.get("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);

  res.status(200).json({ film: foundFilm });
});

router.delete("/:id", (req, res) => {
  const deleteFilm = findFilm(req, res);

  films.splice(films.indexOf(deleteFilm), 1);

  res.status(200).json({ film: deleteFilm });
});

router.put("/:id", (req, res) => {
  const updateFilm = findFilm(req, res);

  updateFilm.title = req.body.title;
  updateFilm.director = req.body.director;

  res.status(200).json({ film: updateFilm });
});

module.exports = router;
