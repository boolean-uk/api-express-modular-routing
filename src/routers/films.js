const express = require("express");
const router = express.Router();

const { films } = require("../../data/index.js");

const findFilm = (filmId) => {
  return films.find((film) => film.id === filmId);
};

router.get("/", (req, res) => {
  res.status(200).json({ films });
});

router.get("/:id", (req, res) => {
  const selectedFilm = findFilm(Number(req.params.id));

  if (!selectedFilm) {
    return res
      .status(404)
      .json({ message: `Film with the ID ${req.params.id} does not exist!` });
  }

  res.status(200).json({ film: selectedFilm });
});

router.post("/", (req, res) => {
  const { title, director } = req.body;
  const newFilm = {
    id: films.length + 1,
    title,
    director,
  };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

router.delete("/:id", (req, res) => {
  const selectedFilm = findFilm(Number(req.params.id));

  if (!selectedFilm) {
    return res
      .status(404)
      .json({ message: `Film with the ID ${req.params.id} does not exist!` });
  }

  films.splice(films.indexOf(selectedFilm), 1);
  res.status(200).json({ film: selectedFilm });
});

router.put("/:id", (req, res) => {
  const selectedFilm = findFilm(Number(req.params.id));

  if (!selectedFilm) {
    return res
      .status(404)
      .json({ message: `Film with the ID ${req.params.id} does not exist!` });
  }

  const { title, director } = req.body;
  selectedFilm.title = title;
  selectedFilm.director = director;
  res.status(200).json({ film: selectedFilm });
});

module.exports = router;
