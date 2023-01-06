const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const films = data.films;
//get all films
router.get("/", (req, res) => {
  const director = req.query.director;
  if (director) {
    const filteredFilms = films.filter((film) => film.director === director);
    res.json({ films: filteredFilms });
  } else res.json({ films: films });
});

//get film by id
router.get("/:id", (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  if (!film) {
    return res
      .status(404)
      .json({ error: "A film with provided ID does not exist" });
  }

  res.json({ film: film });
});

//create a new film
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.director) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  const exists = films.find((item) => item.title === req.body.title);
  if (exists) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }
  const film = { ...req.body, id: films.length + 1 };
  films.push(film);
  res.status(201).json({ film: film });
});
//delete a film
router.delete("/:id", (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  if (!film) {
    return res
      .status(404)
      .json({ error: "A film with provided ID does not exist" });
  }

  const index = films.indexOf(film);
  films.splice(index, 1);
  res.json({ film: film });
});
// update a film
router.put("/:id", (req, res) => {
  const film = films.find((item) => item.id === Number(req.params.id));
  if (!film) {
    return res
      .status(404)
      .json({ error: "A film with provided ID does not exist" });
  }
  const exists = films.find((item) => item.title === req.body.title);
  if (exists) {
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  Object.keys(req.body).forEach((prop) => (film[prop] = req.body[prop]));
  res.json({ film: film });
});

module.exports = router;
