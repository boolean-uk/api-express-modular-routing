// Import data here...
const express = require("express");

const router = express.Router();

const { books } = require("../../data/index.js");

const findBook = (req, res) => {
  const bookId = Number(req.params.id);

  const foundBook = books.find((book) => book.id === bookId);
  console.log(foundBook);

  if (!foundBook) {
    res
      .status(404)
      .json({ message: `Book with the ID ${bookId} does not exist!` });
  }
  return foundBook;
};

// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ books });
});

router.post("/", (req, res) => {
  const bookInfo = req.body;

  const newBook = {
    id: books.length + 1,
    title: bookInfo.title,
    type: bookInfo.type,
    author: bookInfo.author,
    pages: bookInfo.pages,
  };

  books.push(newBook);

  res.status(201).json({ book: newBook });
});

router.get("/:id", (req, res) => {
  const foundBook = findBook(req, res);

  res.status(200).json({ book: foundBook });
});

router.delete("/:id", (req, res) => {
  const foundBook = findBook(req, res);
  books.splice(books.indexOf(foundBook), 1);
  res.status(200).json({ book: foundBook });
});

router.put("/:id", (req, res) => {
  const updateBook = findBook(req, res);

  const body = req.body;
  updateBook.author = body.author;
  updateBook.title = body.title;
  updateBook.type = body.type;
  updateBook.pages = body.pages;

  res.status(200).json({ book: updateBook });
});

module.exports = router;
