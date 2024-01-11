// Import data here...
const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const books = data.books;

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

module.exports = router;
