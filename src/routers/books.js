const express = require("express");
const router = express.Router();
const { books } = require("../../data/index");

router.get("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  const book = books.splice(bookIndex, 1)[0];
  res.json({ book });
});

module.exports = router;
