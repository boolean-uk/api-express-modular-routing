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
  res.json({ book: book });
});

//create a new book
router.post("/", (req, res) => {
  const book = { ...req.body, id: books.length + 1 };
  books.push(book);
  res.status(201).json({ book: book });
});
//delete a book
router.delete("/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.json({ book: book });
});
// update a book
router.put("/:id", (req, res) => {
  const book = books.find((item) => item.id === Number(req.params.id));
  Object.keys(req.body).forEach((prop) => (book[prop] = req.body[prop]));
  res.json({ book: book });
});

module.exports = router;
