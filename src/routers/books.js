const express = require("express");
const router = express.Router();
const { books } = require("../../data/index.js");

// 1. GET: Get all books
router.get("/", (req, res) => {
  res.json({ books });
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  res.json({ book });
});

// 2. POST : Create a book with error message
router.post("/", (req, res, err) => {
  if (!req.body.title || !req.body.author || !req.body.type) {
    res.status(400).json({ error: "Missing fields in request body" });
  }

  const title = req.body.title;
  const bookTitle = books.find((book) => book.title === title);
  if (bookTitle) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  let bookId = books.length;
  bookId++;
  const book = { id: bookId, ...req.body };

  books.push(book);

  res.status(201).json({ book: book });
});

// 3. GET : Get a book by its ID with error message
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res
      .status(404)
      .json({ error: "A book with the provided id does not exists" });
  }
  res.json({ book });
});

// 4. DELETE: Delete a book by ID with error message
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  books.splice(books.indexOf(book), 1);
  res.json({ book });
});

// 5. UPDTAE : PUT > Update a book with with error message
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!req.body.title || !req.body.author || !req.body.type) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  if (!book) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  const title = req.body.title;
  const bookTitle = books.find((book) => book.title === title);
  if (bookTitle) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }
  Object.keys(req.body).forEach((prop) => {
    book[prop] = req.body[prop];
    book.author = req.body.author;
    book.type = req.body.type;
  });
  res.json({ book });
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  const title = req.body.title;
  const bookTitle = books.find((book) => book.title === title);
  if (bookTitle) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }
  Object.keys(req.body).forEach((prop) => {
    book[prop] = req.body[prop];
  });
  res.status(201).json({ book });
});
module.exports = router;
