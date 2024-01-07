const express = require('express')
const router = express.Router()

const data = require('../../data/index.js')
const films = data.films

let filmCounter = films.length


function findFilmByID(req, res) {
const filmID = Number(req.params.id);
const foundFilm = films.find((film) => film.id === filmID);
}

router.get("/", (req, res) => {
return res.status(200).json({ films });
});

router.post("/", (req, res) => {
let newFilm = req.body;

newFilm = { id: ++filmCounter, ...newFilm };
films.push(newFilm);

return res.status(201).json({ film: newFilm });
});

router.get("/:id", (req, res) => {
const foundFilm = findFilmByID(req, res);

return res.status(200).json({ film: foundFilm });
});

router.delete("/:id", (req, res) => {
const foundFilm = findFilmByID(req, res);
const foundFilmIndex = films.indexOf(foundFilm);

films.splice(foundFilmIndex, 1);

return res.status(200).json({ foundFilm });
});

router.put("/:id", (req, res) => {
const foundFilm = findFilmByID(req, res);
const updateInfo = req.body;

foundFilm.title = updateInfo.title;
foundFilm.director = updateInfo.director;

return res.status(200).json({ foundFilm });
});

router.patch("/:id", (req, res) => {
const foundFilm = findFilmByID(req, res);
const { title, director } = req.body;

foundFilm.title = title ? title : foundFilm.title;
foundFilm.director = director ? director : foundFilm.director;

return res.status(200).json({ foundFilm });
});

module.exports = router;