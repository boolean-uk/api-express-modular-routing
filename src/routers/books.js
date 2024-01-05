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

router.post('/', (req, res) => {
    const body = req.body;
    const newBook = {
        id: books.length + 1,
        title: body.title,        
        type: body.type,
        author: body.author,
        pages: body.pages,
    };
    books.push(newBook);
    res.status(201).json({ book: newBook });
});

router.delete('/:id', (req, res) => {
    const bookDelete = findBook(req, res);
    books.splice(books.indexOf(bookDelete), 1);
    res.status(200).json({ message: `Book with the Id: ${bookDelete.id} and title: ${bookDelete.title}. Has been deleted`,  });
})

module.exports = router;
