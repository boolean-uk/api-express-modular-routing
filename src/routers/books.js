const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");

const currentBookId = 5;
const books = data.books;

// Function to find a book by ID
const findBook = (req, res) => {
  const bookId = Number(req.params.id);

  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) {
    res.status(404).json({ error: `Book with ID ${bookId} not found` });
  }

  return foundBook;
};

// Route to get all books
router.get("/", (req, res) => {
  res.status(200).json({ books: books });
});

// Route to add a new book
router.post("/", (req, res) => {
  const { title, type, author, pages } = req.body;
  const newBook = {
    id: currentBookId,
    title,
    type,
    author,
    pages,
  };
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

// Route to get a book by ID
router.get("/:id", (req, res) => {
  const book = findBook(req, res);

  if (book) {
    res.status(200).json({ book: book });
  }
});

// Route to delete a book by ID
router.delete("/:id", (req, res) => {
  const book = findBook(req, res);

  if (book) {
    const bookIndex = books.indexOf(book);
    const deletedBook = books.splice(bookIndex, 1)[0];

    res.status(200).json({ book: deletedBook, message: 'Deleted book successfully' });
  }
});

// Route to update a book by ID
router.put('/:id', (req, res) => {
  const book = findBook(req, res);

  if (book) {
    const { title, type, author, pages } = req.body;
    book.title = title;
    book.type = type;
    book.author = author;
    book.pages = pages;

    res.json({ book: book });
  }
});

module.exports = router;
