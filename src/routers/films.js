const { films } = require("../../data/index.js");

const express = require("express");
const router = express.Router();

let filmCounter = 4;

function filmMatch(filmTitle) {
    const foundFilm = films.find((film) => film.title === filmTitle.title);
    if (foundFilm) return true;
    return false;
}

function findFilmByID(req, res) {
    const filmID = Number(req.params.id);
    const foundFilm = films.find((film) => film.id === filmID);

    if (!foundFilm)
        return res
            .status(404)
            .json({ error: `A film with provided ID does not exist` });
    return foundFilm;
}

function findFilmsByDirector(req, res) {
    const filmDirector = req.query.director;

    const foundFilmsByDirector = films.filter(
        (film) => film.director === filmDirector
    );

    console.log(foundFilmsByDirector)

    if (!foundFilmsByDirector || foundFilmsByDirector.length === 0) {
        return res.status(404).json({
            error: `No films with director: ${filmDirector}`,
        });
    }
    return foundFilmsByDirector;
}

router.get("/", (req, res) => {
    if (req.query.director) {
        const foundFilms = findFilmsByDirector(req, res);
        return res.status(200).json({ films: foundFilms });
    }

    return res.status(200).json({ films: films });
});

router.post("/", (req, res) => {
    let newFilm = req.body;

    if (!newFilm || !newFilm.title || !newFilm.director) {
        return res
            .status(400)
            .json({ error: "Missing fields in request body" });
    }

    if (filmMatch(newFilm)) {
        return res
            .status(409)
            .json({ error: "A film with the provided title already exists" });
    }

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

    return res.status(200).json({ film: foundFilm });
});

router.put("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const updateInfo = req.body;

    if (!updateInfo || !updateInfo.title) {
        return res
            .status(400)
            .json({ error: "Missing fields in request body" });
    }

    if (filmMatch(updateInfo)) {
        return res
            .status(409)
            .json({ error: "A film with the provided title already exists" });
    }

    foundFilm.title = updateInfo.title;
    foundFilm.director = updateInfo.director;

    return res.status(200).json({ film: foundFilm });
});

router.patch("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const { title, director } = req.body;

    if (title === "" || director === "" || !req.body) {
        return res
            .status(400)
            .json({ error: "Missing fields in request body" });
    }

    if (filmMatch(req.body)) {
        return res
            .status(409)
            .json({ error: "A film with the provided title already exists" });
    }

    foundFilm.title = title ? title : foundFilm.title;
    foundFilm.director = director ? director : foundFilm.director;

    return res.status(200).json({ film: foundFilm });
});

module.exports = router;