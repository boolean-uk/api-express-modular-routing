const express = require("express");
const router = express.Router();
const { films } = require("../../data");
const {
  checkForMissingFields,
  checkForExistingEntry,
  findById,
  notFoundError,
} = require("../../src/utils/utils");

// GET

router.get("/", (req, res) => {
  // Gets all films or filtered by director if given in query params
  if (req.query.director) {
    const filteredFilmsByDirector = films.filter((film) =>
      film.director.toLowerCase().includes(req.query.director.toLowerCase())
    );
    if (filteredFilmsByDirector.length) {
      return res.json({ films: filteredFilmsByDirector });
    }
    throw new notFoundError();
  }
  res.json({ films });
});

router.get("/:id", (req, res) => {
  res.json({ film: findById(films, Number(req.params.id)) });
});

// POST

router.post("/", (req, res) => {
  checkForMissingFields(films, req.body);
  checkForExistingEntry(films, req.body);
  const newfilm = { id: films.length + 1, ...req.body };
  films.push(newfilm);
  res.status(201).json({ film: newfilm });
});

// DELETE

router.delete("/:id", (req, res) => {
  const foundfilm = findById(films, Number(req.params.id));
  const indexOfFoundfilm = films.indexOf(foundfilm);
  films.splice(indexOfFoundfilm, 1);
  res.json({ film: foundfilm });
});

// PUT

router.put("/:id", (req, res) => {
  const foundfilm = findById(films, Number(req.params.id));
  checkForExistingEntry(films, req.body);
  const indexOfFoundfilm = films.indexOf(foundfilm);
  const updatedfilm = req.body;
  films[indexOfFoundfilm] = { ...foundfilm, ...updatedfilm };
  res.json({ film: films[indexOfFoundfilm] });
});

// PATCH

router.patch("/:id", (req, res) => {
  const foundFilm = findById(films, Number(req.params.id));
  checkForExistingEntry(films, req.body);
  const indexOfFoundFilm = films.indexOf(foundFilm);
  const updatedFilm = req.body;
  films[indexOfFoundFilm] = { ...foundFilm, ...updatedFilm };
  res.json({ film: films[indexOfFoundFilm] });
});

module.exports = router;
