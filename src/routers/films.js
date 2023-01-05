const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const films = data.films;
//get all films
router.get("/", (req, res) => {
  res.json({ films: films });
});

//get film by id
router.get("/:id", (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  res.json({ film: film });
});

//create a new film
router.post("/", (req, res) => {
  const film = { ...req.body, id: films.length + 1 };
  films.push(film);
  res.status(201).json({ film: film });
});
//delete a film
router.delete("/:id", (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  const index = films.indexOf(film);
  films.splice(index, 1);
  res.json(film);
});
// update a film
router.put("/:id", (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  Object.keys(req.body).forEach((prop) => (film[prop] = req.body[prop]));
  res.json({ film: film });
});

module.exports = router;
