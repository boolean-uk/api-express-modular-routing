const { films } = require('../../data/index.js');

const getAll = (req, res) => {
    res.json({ films });
};

const getFilmById = (req, res) => {
    const film = films.find((film) => film.id === Number(req.params.id));
    if (film === undefined) {
        res.status(404).json({
            error: 'A film with provided ID does not exist',
        });
    }
    res.json({ film });
};

const createFilm = (req, res) => {
    // alternative way:
    // let id = films[films.length - 1].id + 1;
    // const newFilm = { ...req.body, id };
    if (req.body.title === undefined || req.body.director === undefined) {
        res.status(400).json({ error: 'Missing fields in request body' });
    }
    if (films.find((film) => film.title === req.body.title) !== undefined) {
        res.status(409).json({
            error: 'A film with the provided title already exists',
        });
    }
    const newFilm = req.body;
    newFilm.id = films[films.length - 1].id + 1;
    films.push(newFilm);
    res.status(201).json({ film: newFilm });
};

const deleteFilmByID = (req, res) => {
    const film = films.find((film) => film.id === Number(req.params.id));

    if (film === undefined) {
        res.status(404).json({
            error: 'A film with provided ID does not exist',
        });
    }

    films.splice(films.indexOf(film, 1));
    res.json({ film });
};

const updateFilmById = (req, res) => {
    const film = films.find((film) => film.id === Number(req.params.id));

    if (film === undefined) {
        res.status(404).json({
            error: 'A film with provided ID does not exist',
        });
    }

    if (films.find((film) => film.title === req.body.title) !== undefined) {
        res.status(409).json({
            error: 'A film with the provided title already exists',
        });
    }
    Object.keys(req.body).forEach((item) => (film[item] = req.body[item]));
    res.json({ film });
};

module.exports = {
    getAll,
    getFilmById,
    createFilm,
    deleteFilmByID,
    updateFilmById,
};
