const express = require('express');
const router = express.Router();

const { books } = require('../../data/index.js');

const findBook = (req, res) => {
  const bookId = Number(req.params.id);
  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) {
    handleNotFound(res, bookId);
  }

  return foundBook;
};

const handleNotFound = (res, bookId) => {
  res
    .status(404)
    .json({ message: `Book with the ID ${bookId} does not exist!` });
};

router.get('/', (req, res) => {
  res.status(200).json({ books });
});

router.get('/:id', (req, res) => {
  const foundBook = findBook(req, res);
  res.status(200).json({ book: foundBook });
});

router.post('/', (req, res) => {
  const { title, type, author, pages } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    type,
    author,
    pages,
  };
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

router.delete('/:id', (req, res) => {
  const selectedBook = findBook(req, res);

  books.splice(books.indexOf(selectedBook), 1);
  res.status(200).json({ book: selectedBook });
});

router.put('/:id', (req, res) => {
  const selectedBook = findBook(req, res);
  const { title, type, author, pages } = req.body;
  
  selectedBook.title = title;
  selectedBook.type = type;
  selectedBook.author = author;
  selectedBook.pages = pages;

  res.status(200).json({ book: selectedBook });
});

module.exports = router;
