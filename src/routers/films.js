const express = require("express");
const router = express.Router();
const data = require("../../data/index");
const films = data.films;

const doesTitleExist = (title, res) => {
  const foundFilm = films.find((film) => film.title === title);
  if (foundFilm)
    return res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
};
const findFilmBy = (id, res) => {
  const idNum = parseInt(id);
  const foundFilm = films.find((film) => film.id === idNum);
  if (!foundFilm)
    return res
      .status(404)
      .json({ error: "A film with provided ID does not exist" });
  return foundFilm;
};
const findFilmsByDirector = (director, res) => {
  const foundFilmsList = films.filter((film) => film.director === director);
  if (!foundFilmsList)
    return res
      .status(404)
      .json({ error: "There are no films with the provided director" });
  return foundFilmsList;
};

router.get("/", (req, res) => {
  const { director } = req.query;

  if (director) {
    const foundFilmsList = findFilmsByDirector(director, res);
    return res.json({ films: foundFilmsList });
  }

  return res.json({ films: films });
});

router.post("/", (req, res) => {
  const id = films.length + 1;
  const newFilm = req.body;

  if (
    !newFilm.title ||
    !newFilm.director ||
    newFilm.title.length === 0 ||
    newFilm.director.length === 0
  ) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  doesTitleExist(newFilm.title, res);

  newFilm.id = id;
  films.push(newFilm);

  return res.status(201).json({ film: newFilm });
});

router.get("/:id", (req, res) => {
  const foundFilm = findFilmBy(req.params.id, res);
  return res.json({ film: foundFilm });
});

router.delete("/:id", (req, res) => {
  const foundFilm = findFilmBy(req.params.id, res);
  const index = films.indexOf(foundFilm);
  films.splice(index, 1);
  return res.json({ film: foundFilm });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const foundFilm = findFilmBy(id, res);
  const updatedFilm = req.body;
  const { title, director } = updatedFilm;

  doesTitleExist(title, res);

  // not in the requirements
  if (!title || title.length === 0 || !director || director.length === 0) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  foundFilm.title = title;
  foundFilm.director = director;

  return res.json({ film: foundFilm });
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const foundFilm = findFilmBy(id, res);
  const updatedFilm = req.body;
  const { title, director } = updatedFilm;

  doesTitleExist(title, res);

  if (title) {
    foundFilm.title = title;
  }
  if (director) {
    foundFilm.director = director;
  }

  return res.json({ film: foundFilm });
});

module.exports = router;
