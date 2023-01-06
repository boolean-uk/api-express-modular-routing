const express = require("express");
const router = express.Router();
const { films } = require("../../data/index.js");

let id = 0;

router.get("/", (req, res) => {
  const director = req.query.director;
  const directorFilms = films.filter((film) => film.director === director);
  if (director) {
    res.json(directorFilms);
    return;
  }

  res.json({films: films});
});

router.post("/", (req, res) => {
  id += 1;
  const film = { id: id, ...req.body };
  films.push(film);
  res.status(201).json(film);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (film === undefined) {
    return res.status(404).json({
      error: "A film with the provided ID does not exist",
    });
  }
  res.json(film);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmIndex = films.findIndex((film) => film.id === id);

  if (filmIndex === -1)
    return res.status(404).json({
      error: "A film with the provided ID does not exist",
    });

  const deletedFilm = films.splice(filmIndex, 1)[0];
  res.json(deletedFilm);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const newData = { id: id, ...req.body };
  const filmIndex = films.findIndex((film) => film.id === id);

  if (title === undefined)
    return res.status(400).json({
      error: "Missing fields in the request body",
    });

  if (filmIndex === -1)
    return res.status(404).json({
      error: "A film with the provided ID does not exist",
    });

  const found = films.find((film) => film.title === title);
  if (found !== undefined)
    return res.status(409).json({
      error: "A film with the provided email already exists",
    });

  films[filmIndex] = newData;
  res.json(newData);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  Object.assign(film, req.body);

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Missing fields in the request body",
    });

  if (film === undefined)
    return res.status(404).json({
      error: "A film with the provided ID does not exist",
    });

  if (req.body.title !== undefined) {
    const found = films.find((film) => film.title === req.body.title);
    if (found !== undefined)
      return res.status(409).json({
        error: "A film with the provided title already exists",
      });
  }

  res.json(film);
});

module.exports = router;
