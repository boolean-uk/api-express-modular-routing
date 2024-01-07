const express = require("express");
const { books } = require("../../data/index");
const router = express.Router();

// Get request for all books
router.get("/", (req, res) => {
  res.status(200).json({ books });
});

// Get request for a single id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);

  if (book) {
    res.status(200).json({ book });
  } else {
    res.status(404).json({ error: `No book found with id ${id}` });
  }
});

// Post request to create new book
router.post("/", (req, res) => {
  const newBook = {
    ...req.body,
    id: books.length + 1,
  };

  books.push(newBook);

  res.status(201).json({ book: newBook });
});

// Put request to update books
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundBook = books.find((book) => book.id === id);

  if (!foundBook) {
    return res.status(404).json({ error: "No such book with this id" });
  }

  const updates = req.body;
  Object.assign(foundBook, updates);

  res.status(200).json({ book: foundBook });
});
// Delete request to delete book

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundBookIndex = books.findIndex((book) => book.id === id);

  if (foundBookIndex === -1) {
    return res.status(404).json({ error: `No book found with id ${id}` });
  }

  const deletedBook = books.splice(foundBookIndex, 1)[0];

  res.status(200).json({ book: deletedBook });
});

// Write routes here...
module.exports = router;
