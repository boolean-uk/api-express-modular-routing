const router = require('express').Router();

// Import data here...

const { films } = require('../../data/index.js');
const controller = require('../controllers/films.js');

// Write routes here...

router.get('/', controller.getAll);

router.get('/:id', controller.getFilmById);

router.post('/', controller.createFilm);

router.delete('/:id', controller.deleteFilmByID);

router.put('/:id', controller.updateFilmById);

module.exports = router;
