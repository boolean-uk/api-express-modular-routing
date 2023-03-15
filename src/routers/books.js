const router = require('express').Router();

// Import data here...

const { books } = require('../../data/index.js');
const controller = require('../controllers/books.js');

// Write routes here...

router.get('/', controller.getAll);

router.get('/:id', controller.getBookById);

router.post('/', controller.createBook);

router.delete('/:id', controller.deleteBookById);

router.put('/:id', controller.updateBookById);

module.exports = router;
