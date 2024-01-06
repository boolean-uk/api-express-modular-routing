const express = require("express");
const router = express.Router();
let { films } = require("../../data/index");
let nextFilmId = films.length + 1;
router.get("/", (req, res) => {
  return res.send({ films });
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = findFilmById(id);
  if (film) {
    return res.status(200).send({ film });
  } else {
    return res.status(404).send({ error: "Film not found" });
  }
});
router.post("/", (req, res) => {
  const newFilm = {
    ...req.body,
    id: nextFilmId++,
  };
  const existingFilm = findFilmByTitle(newFilm.title);
  if (existingFilm) {
    return res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
  }
  if (isValidFilm(newFilm)) {
    films.push(newFilm);
    return res.status(201).send({ film: newFilm });
  }
  return res.status(400).send({ error: "Invalid fields in request body" });
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedFilm = req.body;
  const filmToUpdate = findFilmById(id);
  if (filmToUpdate && isValidFilm(updatedFilm)) {
    const conflictingFilm = findFilmByTitle(updatedFilm.title);
    if (conflictingFilm && conflictingFilm.id !== id) {
      return res
        .status(409)
        .send({ error: "A film with the provided title already exists" });
    }
    Object.assign(filmToUpdate, updatedFilm);
    const newFilm = findFilmById(id);
    return res.send({ film: newFilm });
  }
  return res
    .status(404)
    .send({ error: "Film not found or invalid fields in request body" });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmToDelete = findFilmById(id);

  if (filmToDelete) {
    films = films.filter((film) => film.id !== id);
    return res.send({ film: filmToDelete });
  } else {
    return res.status(404).send({ error: "Film not found" });
  }
});
function findFilmById(id) {
  return films.find((film) => film.id === id);
}
function findFilmByTitle(title) {
  return films.find((film) => film.title === title);
}
function isValidFilm(film) {
  return (
    film &&
    film.title !== undefined &&
    film.title.trim() !== "" &&
    film.director !== undefined &&
    film.director.trim() !== ""
  );
}

module.exports = router;
