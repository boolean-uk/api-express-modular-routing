// Import data here...
const express = require("express");
const router = express.Router();

const data = require("../../data/index.js");

const findBook = (req, res) => {
  const bookId = Number(req.params.id);

  const foundBook = data.books.find((book) => book.id === bookId);

  if (!foundBook) {
    res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  return foundBook;
};

let currentId = 4;

// Write routes here...
router.get("/", (req, res) => {
  return res.json({ books: data.books });
});

router.get("/:id", (req, res) => {
  const book = findBook(req, res);

  if (!book) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  return res.json({ book });
});

router.post("/", (req, res) => {
  const { title, type, author } = req.body;

  if (!title || !type || !author) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const isTitleExisting = data.books.find((book) => book.title === title);

  if (isTitleExisting) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  const newBook = {
    id: ++currentId,
    title: title,
    type: type,
    author: author,
  };

  data.books.push(newBook);

  return res.status(201).json({ book: newBook });
});

// router.put("/:id", (req, res) => {
//   const book = findBook(req, res);
//   const { title, type, author } = req.body;

//   book.title = title;
//   book.type = type;
//   book.author = author;

//   return res.json({ book });
// });

router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBookData = req.body;

  const existingBook = data.books.find((book) => book.id === bookId);

  if (!existingBook) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  if (
    !updatedBookData.title ||
    !updatedBookData.type ||
    !updatedBookData.author
  ) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }

  const isTitleExisting = data.books.some(
    (book) => book.title === updatedBookData.title && book.id !== bookId
  );

  
  if (isTitleExisting) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }

  existingBook.title = updatedBookData.title;
  existingBook.type = updatedBookData.type;
  existingBook.author = updatedBookData.author;

  return res.json({ book: existingBook });
});

router.delete("/:id", (req, res) => {
  const book = findBook(req, res);

  if (!book) {
    return res
      .status(404)
      .json({ error: "A book with the provided ID does not exist" });
  }

  const bookIndex = data.books.indexOf(book);

  data.books.splice(bookIndex, 1);

  return res.json({ book });
});

module.exports = router;
