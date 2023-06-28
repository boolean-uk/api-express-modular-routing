const express = require("express");
const router = express.Router();
const { films } = require("../../data/index.js");

let id = 5;

const findFilmById = (id) => {
  return films.find((film) => film.id === id);
};

// 1. Retrieve all films & 7. EXTENSION Retrieve a list of films
router.get("/", (req, res) => {
  res.json({ films });
});

router.get("/", (req, res) => {
  if (!req.query.director) {
    res.json({ films });
  } else {
    const director = req.query.director;
    director.split("_").join(" ");
    const filteredArray = films.filter((film) => film.director === director);
    res.json({ films: filteredArray });
  }
});

// 2. Create a film
router.post("/", (req, res) => {
  const body = req.body;
  if (!Object.keys(body)[0]) {
    res.status(400).send({ error: "Missing fields in request body" });
  } else if (films.find((film) => film.director === body.director)) {
    res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
  } else {
    body.id = id++;
    films.push(body);
    res.status(201).send({ film: body });
  }
});

// 3. Get a film by ID
router.get("/:id", (req, res) => {
  const filmId = Number(req.params.id);
  const film = findFilmById(filmId);
  if (!film) {
    res.status(404).send({ error: "A film with provided ID does not exist" });
  } else {
    res.send({ film });
  }
});

// 4. Delete a film by ID
router.delete("/:id", (req, res) => {
  const filmId = Number(req.params.id);
  const filmIndex = films.findIndex((film) => film.id === filmId);
  const film = findFilmById(filmId);
  if (!film) {
    res.status(404).send({ error: "A film with provided ID does not exist" });
  } else {
    films.splice(filmIndex, 1);
    res.send({ film });
  }
});

// 5. Update a film by ID
router.put("/:id", (req, res) => {
  const filmId = Number(req.params.id);
  const body = req.body;
  const filmIndex = films.findIndex((film) => film.id === filmId);
  const film = findFilmById(filmId);

  if (!film) {
    res.status(404).send({ error: "A film with provided ID does not exist" });
  } else if (films.find((film) => film.title === body.title)) {
    res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
  } else {
    films[filmIndex] = body;
    films[filmIndex].id = film.id;
    res.json({ film: films[filmIndex] });
  }
});

// 6. EXTENSION Update a film by ID
router.patch("/:id", (req, res) => {
  const filmId = Number(req.params.id);
  const body = req.body;
  const film = findFilmById(filmId);
  const bodyArray = Object.entries(body);

  if (!Object.keys(body)[0]) {
    res.status(400).send({ error: "Missing fields in request body" });
  } else if (!film) {
    res.status(404).send({ error: "A film with provided ID does not exist" });
  } else if (films.find((film) => film.title === body.title)) {
    res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
  } else {
    bodyArray.forEach((film) => {
      const filmKeys = { ...film, [film[0]]: film[1] };
      res.status(200).json({ film: filmKeys });
    });
  }
});

module.exports = router;
