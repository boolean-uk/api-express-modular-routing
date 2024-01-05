// Import data here...
const express = require('express');
const router = express.Router();

// Write routes here...
const { books } = require('../../data/index.js');

const findBook = (req, res) => {
    const bookId = Number(req.params.id);
    const foundBook = books.find((book) => book.id === bookId);
    if (!foundBook) {
        res
          .status(404)
          .json({ message: `Book with the ID ${bookId} does not exist!` });
    }
    return foundBook;
};

router.get('/', (req, res) => {
    res.status(200).json({ books });
});

router.get('/:id', (req, res) => {
    const foundBook = findBook(req, res);
    res.status(200).json({ book: foundBook });
});


module.exports = router;
