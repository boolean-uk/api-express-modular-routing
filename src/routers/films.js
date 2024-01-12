// Import data here...
const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const films = data.films;

// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ films: films });
});

router.post("/", (req, res) => {
  const filmInfo = req.body;

  const newFilm = {
    id: films.length + 1,
    title: filmInfo.title,
    director: filmInfo.director,
  };

  films.push(newFilm);
  res.status(201).json({ newFilm });
});

module.exports = router;
