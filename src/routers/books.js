const express = require("express");
const router = express.Router();

const books = require("../../data/index").books;

let bookId = 4;

const findBookById = (req, res) => {
  const bookId = Number(req.params.id);

  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) {
    res
      .status(404)
      .send({ error: "A book with the provided ID does not exist" });
  }

  return foundBook;
};

router.get("/", (req, res) => {
  return res.status(200).send({ books: books });
});

router.post("/", (req, res) => {
  const { title, type, author } = req.body;

  if (!title || !type || !author) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }

  const titleExists = books.some((book) => book.title === title);

  if (titleExists) {
    return res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  }

  const newBook = {
    title: title,
    type: type,
    author: author,
    id: ++bookId,
  };

  books.push(newBook);

  res.status(201).send({ book: newBook });
});

router.get("/:id", (req, res) => {
  const foundBook = findBookById(req, res);

  if (foundBook) {
    return res.status(200).send({ book: foundBook });
  }

  return foundBook;
});

router.delete("/:id", (req, res) => {
  const foundBook = findBookById(req, res);

  if (foundBook) {
    const bookIndex = books.indexOf(foundBook);

    books.splice(bookIndex, 1);

    return res.status(200).send({ book: foundBook });
  }

  return foundBook;
});

router.put("/:id", (req, res) => {
  const foundBook = findBookById(req, res);
  const { title, type, author } = req.body;

  if (!title || !type || !author) {
    return res.status(400).send({ error: "Missing field in request body" });
  }

  const titleExists = books.some((book) => book.title === title);

  if (titleExists) {
    return res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  }

  if (foundBook) {
    const bookIndex = books.indexOf(foundBook);

    const updatedBook = {
      title: title,
      type: type,
      author: author,
      id: foundBook.id,
    };

    books[bookIndex] = updatedBook;

    return res.status(200).send({ book: updatedBook });
  }

  return foundBook;
});

router.patch("/:id", (req, res) => {
  const foundBook = findBookById(req, res);
  const body = req.body;

  if (!body.title && !body.type && !body.author) {
    return res.status(400).send({ error: "Missing field in request body" });
  }

  const titleExists = books.some((book) => book.title === body.title);

  if (titleExists) {
    return res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  }

  if (foundBook) {
    const bookIndex = books.indexOf(foundBook);

    const updatedBook = {
      ...foundBook,
      ...body,
      id: foundBook.id,
    };

    books[bookIndex] = updatedBook;

    return res.status(200).send({ book: updatedBook });
  }

  return foundBook;
});

module.exports = router;
