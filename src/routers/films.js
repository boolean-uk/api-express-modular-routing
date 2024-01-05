const express = require("express");
const router = express.Router();

const { films } = require("../../data/index.js");

const findFilm = (req, res) => {
  const filmId = Number(req.params.id);
  const foundFilm = films.find((film) => film.id === filmId);
  if (!foundFilm) {
    res
      .status(404)
      .json({ message: `Film with the ID ${filmId} does not exist!` });
  }
  return foundFilm;
};

router.get("/", (req, res) => {
  res.status(200).json({ films });
});

router.get("/:id", (req, res) => {
  const foundFilm = findFilm(req, res);
  res.status(200).json({ film: foundFilm });
});

router.post("/", (req, res) => {
  const body = req.body;
  const newFilm = {
    id: films.length + 1,
    title: body.title,
    director: body.director,
  };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

router.delete("/:id", (req, res) => {
    const filmDelete = findFilm(req, res);
    films.splice(films.indexOf(filmDelete), 1);
    res.status(200).json({ message: `Film with the Id: ${filmDelete.id} and title: ${filmDelete.title}. Has been deleted`,  });
})

router.put("/:id", (req, res) => {
    const filmUpdate = findFilm(req, res);
    const body = req.body;
    filmUpdate.title = body.title;
    filmUpdate.director = body.director;
    res.status(200).json({ film: filmUpdate });
})

module.exports = router;
