// Import data here...
const express = require("express");
const { films } = require("../../data/index");
const router = express.Router();

// Get request for all films
router.get("/", (req, res) => {
  res.status(200).json({ films });
});

// Get request for a single id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find((film) => film.id === id);

  if (film) {
    res.status(200).json({ film });
  } else {
    res.status(404).json({ error: `No film found with id ${id}` });
  }
});
// Post request to create new film
router.post("/", (req, res) => {
  const newFilm = {
    ...req.body,
    id: films.length + 1,
  };

  films.push(newFilm);

  res.status(201).json({ film: newFilm });
});

// Put request to update film
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundFilm = films.find((film) => film.id === id);

  if (!foundFilm) {
    return res.status(404).json({ error: `No film found with id ${id}` });
  }

  const updates = req.body;
  Object.assign(foundFilm, updates);

  res.status(200).json({ film: foundFilm });
});
// Delete request to delete film
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundFilmIndex = films.findIndex((film) => film.id === id);

  if (foundFilmIndex === -1) {
    return res.status(404).json({ error: `No film found with id ${id}` });
  }

  const deletedFilm = films.splice(foundFilmIndex, 1)[0];

  res.status(200).json({ film: deletedFilm });
});

module.exports = router;
