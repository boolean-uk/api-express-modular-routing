const express = require("express");
const router = express.Router();

const { books } = require("../../data/index.js");

// get the whole list of books
router.get("/", (req, res) => {
  res.json({ books: books });
});

// add a new book
router.post("/", (req, res) => {
  let id;
  if (books.length === 0) {
    id = 1;
  } else {
    id = books[books.length - 1].id + 1;
  }
  const newBook = { ...req.body, id };
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

// retrieve a book by its specific id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((singleBook) => singleBook.id === id);

  res.json({ book: book });
});

// delete a book by its id

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((singleBook) => singleBook.id === id);
  books.splice(books.indexOf(book), 1);
  res.status(200).json({ book: book });
});

// update a book by its specific id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((singleBook) => singleBook.id === id);
  Object.keys(req.body).forEach((prop) => (book[prop] = req.body[prop]));
  res.json({ book: book });
});

module.exports = router;
