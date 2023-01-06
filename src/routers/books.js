const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const books = data.books;
//get all books
router.get("/", (req, res) => {
  res.json({ books: books });
});

//get book by id
router.get("/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));
  if (!book) {
    return res
      .status(404)
      .json({ error: "A book the provided ID does not exist" });
  }

  res.json({ book: book });
});

//create a new book
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.type || !req.body.author) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  const exists = books.find((item) => item.title === req.body.title);
  if (exists) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }
  const book = { ...req.body, id: books.length + 1 };
  books.push(book);
  res.status(201).json({ book: book });
});
//delete a book
router.delete("/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));
  if (!book) {
    return res
      .status(404)
      .json({ error: "A book the provided ID does not exist" });
  }

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.json({ book: book });
});
// update a book
router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.type || !req.body.author) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  const book = books.find((item) => item.id === Number(req.params.id));
  if (!book) {
    return res
      .status(404)
      .json({ error: "A book the provided ID does not exist" });
  }
  const exists = books.find((item) => item.title === req.body.title);
  if (exists) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  Object.keys(req.body).forEach((prop) => (book[prop] = req.body[prop]));
  res.json({ book: book });
});

module.exports = router;
