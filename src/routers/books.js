const express = require("express");
const router = express.Router();
const { books } = require("../../data");
const {
  checkForMissingFields,
  checkForExistingEntry,
  findById,
} = require("../../src/utils/utils");

// GET

router.get("", (req, res) => {
  // Gets all books
  res.json({ books });
});

router.get("/:id", (req, res) => {
  res.json({ book: findById(books, Number(req.params.id)) });
});

// POST

router.post("", (req, res) => {
  checkForMissingFields(books, req.body);
  checkForExistingEntry(books, req.body);
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json({ Book: newBook });
});

// DELETE

router.delete("/:id", (req, res) => {
  const foundBook = findById(books, Number(req.params.id));
  const indexOfFoundBook = books.indexOf(foundBook);
  books.splice(indexOfFoundBook, 1);
  res.json({ book: foundBook });
});

// PUT

router.put("/:id", (req, res) => {
  const foundBook = findById(books, Number(req.params.id));
  checkForExistingEntry(books, req.body);
  const indexOfFoundBook = books.indexOf(foundBook);
  const updatedBook = req.body;
  books[indexOfFoundBook] = { ...foundBook, ...updatedBook };
  res.json({ book: books[indexOfFoundBook] });
});

// PATCH

router.patch("/:id", (req, res) => {
  const foundBook = findById(books, Number(req.params.id));
  checkForExistingEntry(books, req.body);
  const indexOfFoundBook = books.indexOf(foundBook);
  const updatedBook = req.body;
  books[indexOfFoundBook] = { ...foundBook, ...updatedBook };
  res.json({ book: books[indexOfFoundBook] });
});

module.exports = router;
