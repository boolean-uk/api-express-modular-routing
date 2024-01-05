const express = require("express");
const router = express.Router();

const data = require("../../data/index.js");
const { film1, film2, film3 } = require("../../test/fixtures/filmData.js");

const findFilm = (req, res) => {
  const filmId = Number(req.params.id);

  const foundFilm = data.films.find((film) => film.id === filmId);

  if (!foundFilm) {
    res
      .status(404)
      .json({ error: "A film with the provided ID does not exist" });
  }

  return foundFilm;
};

let currentId = 4

router.get("/", (req, res) => {
  return res.json({ films: data.films });
});

router.get("/:id", (req, res) => {
  const film = findFilm(req, res);

  return res.status(200).json({ film });
});

router.post('/', (req, res) => {
    const body = film1

    const newFilm = {
        id: ++currentId,
        ...body
    }

    data.films.push(newFilm)

    return res.status(201).json({film: newFilm})
})

module.exports = router;
