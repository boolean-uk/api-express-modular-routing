const express = require("express");
const router = express.Router();
const { books } = require("../../data/index.js");

let id = 5;

const findBooksById = (id) => {
  return books.find((book) => book.id === id);
};

router.get("/", (req, res) => {
  res.json({ books });
});

router.post("/", (req, res) => {
  const body = req.body;
  const titleFinder = books.find((book) => book.title === body.title);
  if (
    !Object.hasOwn(body, "author") ||
    !Object.hasOwn(body, "title") ||
    !Object.hasOwn(body, "type") ||
    !Object.hasOwn(body, "pages")
  ) {
    res.status(400).send({ error: "Missing fields in request body" });
  } else if (titleFinder) {
    res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  } else {
    body.id = id++;
    books.push(body);
    res.status(201).send({ book: body });
  }
});

router.get("/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = findBooksById(bookId);
  if (!book) {
    res.status(404).send({ error: "A book the provided ID does not exist" });
  } else res.send({ book });
});

router.delete("/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);
  const book = findBooksById(bookId);
  if (!book) {
    res.status(404).send({ error: "A book the provided ID does not exist" });
  } else {
    books.splice(bookIndex, 1);
    res.send({ book });
  }
});

router.put("/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const body = req.body;
  const bookIndex = books.findIndex((book) => book.id === bookId);
  const book = findBooksById(bookId);
  const titleFinder = books.find((book) => book.title === body.title);
  if (
    !Object.hasOwn(body, "author") ||
    !Object.hasOwn(body, "title") ||
    !Object.hasOwn(body, "type") ||
    !Object.hasOwn(body, "pages")
  ) {
    res.status(400).send({ error: "Missing fields in request body" });
  } else if (!book) {
    console.log(Object.keys(body));
    res.status(404).send({ error: "A book the provided ID does not exist" });
  } else if (titleFinder) {
    res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  } else {
    books[bookIndex] = body;
    books[bookIndex].id = book.id;
    res.send({ book: books[bookIndex] });
  }
});

module.exports = router;
