const express = require("express");
const router = express.Router();
const { films } = require("../../data/index.js");

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  res.json({ film });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  films.splice(films.indexOf(film), 1);
  res.json({ film });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);

  if (!film) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  const title = req.body.title;
  const filmTitle = films.find((film) => film.title === title);
  if (filmTitle) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  Object.keys(req.body).forEach((prop) => {
    film[prop] = req.body[prop];
  });
  res.json({ film });
});

router.post("/", (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "Missing fields in request body" });
  }

  const title = req.body.title;
  const filmTitle = films.find((film) => film.title === title);
  if (filmTitle) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  let id = films.length;
  id++;
  const film = { ...req.body, id };
  films.push(film);
  res.status(201).json({ film: film });
});

router.get("/", (req, res) => {
  const director = req.query.director;
  if (director) {
    const getFilms = films.filter((film) => film.director === director);
    res.json(getFilms);
  } else res.json({ films });
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  const title = req.body.title;
  const filmTitle = films.find((film) => film.title === title);
  if (filmTitle) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }
  Object.keys(req.body).forEach((prop) => {
    film[prop] = req.body[prop];
  });
  res.status(201).json({ film });
});
module.exports = router;
