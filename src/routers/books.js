// Import data here...
const express = require("express");
const router = express.Router();

// Write routes here...
const { books } = require('../../data/index');

let id = getRandomId();

// Retrieve a list of books
router.get('/', (req, res) => {
  res.json({ books });
});

// Create a new book
router.post('/', (req, res) => {
  const newBook = { id: id++, ...req.body };
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

// Get a book by ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (book) {
    res.json({ book });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Delete a book by ID
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const removedBook = books.splice(bookIndex, 1);
    res.json({ book: removedBook[0] });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Update a book by ID
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    const updatedBook = { id: bookId, ...req.body };
    books[bookIndex] = updatedBook;
    res.json({ book: updatedBook });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

// Generate a random ID
function getRandomId() {
  return Math.floor(Math.random() * 1000) + 1;
}

module.exports = router;
