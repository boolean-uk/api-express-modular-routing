const express = require("express");
const router = express.Router();
let { books } = require("../../data/index");

let newId = books.length;

router.get("/", (req, res) => {
  return res.send({ books });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = findBookById(id);
  if (book) {
    return res.send({ book });
  } else {
    return res.status(404).send({ error: "Book not found" });
  }
});

router.post("/", (req, res) => {
  const newBook = req.body;
  if (isValidBook(newBook)) {
    const existingBook = findBookByTitle(newBook.title);
    if (existingBook) {
      return res
        .status(409)
        .send({ error: "A book with the provided title already exists" });
    } else {
      newBook.id = generateNewId();
      books.push(newBook);
      return res.status(201).send({ book: newBook });
    }
  } else {
    return res.status(400).send({ error: "Invalid book data" });
  }
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedBook = req.body;
  const existingBook = findBookById(id);

  if (existingBook && isValidBook(updatedBook)) {
    const conflictingBook = findBookByTitle(updatedBook.title);
    if (conflictingBook && conflictingBook.id !== id) {
      return res
        .status(409)
        .send({ error: "A book with the provided title already exists" });
    } else {
      Object.assign(existingBook, updatedBook);
      return res.send({ book: existingBook });
    }
  } else {
    return res
      .status(400)
      .send({ error: "Invalid book data or book not found" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const bookToDelete = findBookById(id);

  if (bookToDelete) {
    books = books.filter((book) => book.id !== id);
    return res.send({ book: bookToDelete });
  } else {
    return res.status(404).send({ error: "Book not found" });
  }
});

function findBookById(id) {
  return books.find((book) => book.id === id);
}

function findBookByTitle(title) {
  return books.find((book) => book.title === title);
}

function isValidBook(book) {
  return (
    book &&
    book.title !== undefined &&
    book.title.trim() !== "" &&
    book.author !== undefined &&
    book.author.trim() !== ""
  );
}

function generateNewId() {
  return books.length + 1;
}

module.exports = router;
