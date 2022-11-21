const express = require("express");
const router = express.Router();
const { films } = require('../../data')
let filmId = films.length

router.get("/", (req, res) => {
  const director = req.query.director
  if (director) {
    res.json(films.filter(film => film.director === director))
  } else {
    res.json({ films });
  }
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find(film => film.id === id);

  res.json({ film });
});

router.post("/", (req, res) => {
  filmId++

  const film = {
    ...req.body,
    id: filmId
  };

  films.push(film);

  res.json({ film: film });
});

module.exports = router;
