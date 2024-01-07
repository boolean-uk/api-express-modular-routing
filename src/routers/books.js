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

// Write routes here...
module.exports = router;
