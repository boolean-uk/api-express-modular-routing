// films.js

const express = require('express');
const router = express.Router();
const { films } = require('../../data/index');

// Define routes for /users here
router.get('/', (req, res) => {
    // Send the array of users as a response
    res.json({ films: films });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find((u) => u.id === id);
  res.json({ film: film });
});

router.post('/', (req, res) => {
  const newFilm = req.body;
  newFilm.id = films.length + 1;
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filmIndex = films.findIndex((f) => f.id === id);
  films[filmIndex] = { ...films[filmIndex], ...req.body, id: id };
  res.json({ film: films[filmIndex] });
});

module.exports = router;
