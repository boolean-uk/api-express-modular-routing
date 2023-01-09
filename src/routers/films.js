const express = require("express");
const router = express.Router();

const { films } = require("../../data/index.js");

// get all films
router.get("/", (req, res) => {
  res.json(films);
});

// create films
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.director) {
    res.status(400).json({ error: "Missing fields in request body" });
    return;
  }

  const alreadyExists = films.find((film) => film.title === req.body.title);
  if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  const film = { ...req.body, id: films.length + 1 };
  films.push(film);
  res.status(201).json({ film: film });
});

// get user by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);

  if (!film) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  res.json({ film: film });
});

// delete user by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);

  if (!film) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  films.splice(films.indexOf(film), 1);
  res.status(201).json({ film: film });
  //   console.log("hello",)
});
// edit user by id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  const alreadyExists = films.find((film) => film.title === req.body.title);

  if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }
  Object.keys(req.body).forEach((prop) => (film[prop] = req.body[prop]));
  res.json({ film: film });
});


module.exports = router;
