// books.js

const express = require("express");
const router = express.Router();
const { books } = require("../../data/index");

// Define routes for /users here
router.get("/", (req, res) => {
  // Send the array of users as a response
  res.json({ books: books });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((u) => u.id === id);
  res.json({ book: book });
});

router.post("/", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  books[bookIndex] = { ...books[bookIndex], ...req.body, id: id };
  res.json({ book: books[bookIndex] });
});

module.exports = router;
