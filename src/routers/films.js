const express = require("express");
const router = express.Router();

const data = require("../../data/index.js");


const findFilm = (req, res) => {
  const filmId = Number(req.params.id);

  const foundFilm = data.films.find((film) => film.id === filmId);

  if (!foundFilm) {
    res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });
  }

  return foundFilm;
};

let currentId = 4;

router.get("/", (req, res) => {
  return res.json({ films: data.films });
});

router.get("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);

  const isFilmExisting = data.films.find((film) => film.id === foundFilm.id);

  if (!isFilmExisting)
    return res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });

  return res.status(200).json({ film: foundFilm });
});

router.post("/", (req, res) => {
  const { title, director } = req.body;

  if (!title && !director) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const isFilmExisting = data.films.find((film) => film.title === title);

  if (isFilmExisting) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const newFilm = {
    id: ++currentId,
    title: title,
    director: director,
  };

  data.films.push(newFilm);

  return res.status(201).json({ film: newFilm });
});

router.delete("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);

  const isFilmExisting = data.films.find((film) => film.id === foundFilm.id);

  if (!isFilmExisting) {
    return res
      .status(409)
      .json({ error: "A film with the provided tID does not exist" });
  }

  const filmIndex = data.films.indexOf(foundFilm);

  data.films.splice(filmIndex, 1);

  return res.status(200).json({ film: foundFilm });
});

router.put("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);
  const { title, director } = req.body;

  const isIdExisting = data.films.find((film) => film.id === foundFilm.id);

  const isTitleExisting = data.films.find((film) => film.title === title);

  if (isTitleExisting) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  if (!isIdExisting) {
    return res
      .status(409)
      .json({ error: "A film with the provided ID does not exist" });
  }

  foundFilm.title = title;
  foundFilm.director = director;

  return res.json({ film: foundFilm });
});

router.patch("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);
  const { title, director } = req.body;

  const isIdExisting = data.films.find((film) => film.id === foundFilm.id);

  const isTitleExisting = data.films.find((film) => film.title === title);

  if (isTitleExisting) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  if (!isIdExisting) {
    return res
      .status(409)
      .json({ error: "A film with the provided ID does not exist" });
  }

  if (!title && !director) {
    return res.status(400).json({error: "Missing fields in request body"})
  }

  foundFilm.title = title;
  foundFilm.director = director;

  return res.json({ film: foundFilm });
});

module.exports = router;
