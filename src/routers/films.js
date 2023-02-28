const express = require("express");
const router = express.Router();
const { films } = require("../../data/index.js");

// retrieve a list of all films
router.get("/", (req, res) => {
  res.json({ films: films });
});

// create a film and add it to the list
router.post("/", (req, res) => {
  let id;
  if (films.length === 0) {
    id = 1;
  } else {
    id = films[films.length - 1].id + 1;
  }
  const newFilm = { ...req.body, id };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

// retrieve a film by its id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((singleFilm) => singleFilm.id === id);

  res.json({ film: film });
});

// delete a film by its id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((singleFilm) => singleFilm.id === id);
  films.splice(films.indexOf(film), 1);
  res.json({ film: film });
});

// update a film by its id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((singleFilm) => singleFilm.id === id);
  Object.keys(req.body).forEach((prop) => (film[prop] = req.body[prop]));
  res.json({ film: film });
});

module.exports = router;
