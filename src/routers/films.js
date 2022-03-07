const express = require("express");
const router = express.Router();
const { films } = require('../../data.js')
let filmId = films.length

router.get("/", (req, res) => {
  res.json({ films })
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
