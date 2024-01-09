const express = require("express");
const router = express.Router();
const { books } = require('../../data/index.js')
let bookId = books.length

router.get("/", (req, res) => {
  res.json({ books });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(book => book.id === id);

  res.json({ book });
});

router.post("/", (req, res) => {
  bookId++;

  const book = {
    ...req.body,
    id: bookId
  };

  books.push(book);

  res.json({ book });
});

module.exports = router;