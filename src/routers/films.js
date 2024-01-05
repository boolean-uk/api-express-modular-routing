const { films } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

let filmCounter = 4

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
            .json({ ERROR: `A film with ID:${filmID} does not exist` });
    return foundFilm;
}

router.get("/", (req, res) => {
    return res.status(200).json({ films: films });
});

router.post("/", (req, res) => {
    let newFilm = req.body;

    if (!newFilm || !newFilm.title || !newFilm.director) {
        return res
            .status(400)
            .json({ ERROR: "Missing fields in request body" });
    }

    if (filmMatch(newFilm)) {
        return res
            .status(409)
            .json({ ERROR: "A film with the provided title already exists" });
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
            .json({ ERROR: "Missing fields in request body" });
    }

    if (filmMatch(updateInfo)) {
        return res
            .status(409)
            .json({ ERROR: "A user with the provided title already exists" });
    }

    foundFilm.title = updateInfo.title
    foundFilm.director = updateInfo.director

    return res.status(200).json({ film: foundFilm });
});

router.patch('/:id', (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const { title, director } = req.body;

    if (title === "" || director === "" || !req.body) {
        return res
            .status(400)
            .json({ ERROR: "Missing fields in request body" });
    }

    if (filmMatch(req.body)) {
        return res
            .status(409)
            .json({ ERROR: "A user with the provided title already exists" });
    }

    foundFilm.title = title?title:foundFilm.title
    foundFilm.director = director?director:foundFilm.director

    return res.status(200).json({ film: foundFilm });
})


module.exports = router