const express = require('express');
const { films } = require('../../data/index');

const router = express.Router();
let id = films.length + 1;

// Retrieve a list of films
router.get('/', (req, res) => {
  res.json({ films });
});

// Create a new film
router.post('/', (req, res) => {
  const newFilm = { id: id++, ...req.body };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

// Get a film by ID
router.get('/:id', (req, res) => {
  const filmId = parseInt(req.params.id);
  const film = films.find((film) => film.id === filmId);

  if (film) {
    res.json({ film });
  } else {
    res.status(404).end();
  }
});

// Delete a film by ID
router.delete('/:id', (req, res) => {
  const filmId = parseInt(req.params.id);
  const filmIndex = films.findIndex((film) => film.id === filmId);

  if (filmIndex !== -1) {
    const removedFilm = films.splice(filmIndex, 1);
    res.json({ film: removedFilm[0] });
  } else {
    res.status(404).end();
  }
});

// Update a film by ID
router.put('/:id', (req, res) => {
  const filmId = parseInt(req.params.id);
  const filmIndex = films.findIndex((film) => film.id === filmId);

  if (filmIndex !== -1) {
    const updatedFilm = { id: filmId, ...req.body };
    films[filmIndex] = updatedFilm;
    res.json({ film: updatedFilm });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
