// Import data here...
const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const books = data.books;

const findBook = (req, res) => {
  const bookId = Number(req.params.id);

  const foundBook = books.find((book) => book.id === bookId);
  console.log(foundBook);

  if (!foundBook) {
    res
      .status(400)
      .json({ message: `Book with such Id ${bookId} doesn't exist ` });
  }
  return foundBook;
};

// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ books: books });
});

router.post("/", (req, res) => {
  const bookInfo = req.body;

  const newBook = {
    id: books.length + 1,
    title: bookInfo.title,
    type: bookInfo.type,
    author: bookInfo.author,
    pages: bookInfo.pages,
  };

  books.push(newBook);

  res.status(201).json({ newBook: newBook });
});

router.get("/:id", (req, res) => {
  const foundBook = findBook(req, res);

  res.status(200).json({ book: foundBook });
});

router.delete("/:id", (req, res) => {
  const foundBook = findBook(req, res);
  books.splice(books.indexOf(foundBook), 1);
  res.status(201).json({ foundBook });
});

module.exports = router;
