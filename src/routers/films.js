const express = require("express");
const router = express.Router();
const { films } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.json({ films });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => id === film.id);
  res.json({ film });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => id === film.id);
  films.splice(films.indexOf(film), 1);
  res.json({ film });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => id === film.id);
  Object.keys(req.body).forEach((prop) => {
    film[prop] = req.body[prop];
    res.json({ film });
  });
});

router.post("/", (req, res) => {
  let id = films.length;
  id++;
  const film = { ...req.body, id };
  films.push(film);
  res.status(201).json({ film: film });
});
module.exports = router;
