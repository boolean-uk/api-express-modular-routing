const express = require('express')
const router = express.Router()

const data = require('../../data/index.js')
const films = data.films


function findFilmByID(req, res) {
    const filmID = Number(req.params.id);
    const foundFilm = films.find((film) => film.id === filmID);

    if (!foundFilm) {
        res
            .status(404)
            .json({ message: `Film with the ID ${filmId} does not exist!` });
    }
    return foundFilm;
}

router.get("/", (req, res) => {
    return res.status(200).json({ films });
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

router.get("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);

    return res.status(200).json({ film: foundFilm });
});


router.put("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const updateInfo = req.body;

    foundFilm.title = updateInfo.title;
    foundFilm.director = updateInfo.director;

    return res.status(200).json({ film: foundFilm });
});

router.patch("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const { title, director } = req.body;

    foundFilm.title = title ? title : foundFilm.title;
    foundFilm.director = director ? director : foundFilm.director;

    return res.status(200).json({ foundFilm });
});

router.delete("/:id", (req, res) => {
    const filmDelete = findFilmByID(req, res);
    films.splice(films.indexOf(filmDelete), 1);
    return res.status(200).json({ film: filmDelete });
})


module.exports = router;


