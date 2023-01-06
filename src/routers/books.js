const express = require("express");
const router = express.Router();
const { books } = require("../../data/index.js");

router.get("/", (req, res) => {
  const author = req.query.author;
  const authorBooks = books.filter((book) => book.author === author);
  if (author) {
    res.json(authorBooks);
    return;
  }

  res.json({ books });
});

router.post("/", (req, res) => {
  const lastIndex = books.length - 1;
  const id = books[lastIndex].id + 1;
  const requiredData = [
    "title",
    "type",
    "author",
    "topic",
    "publicationDate",
    "pages",
  ];
  const test = requiredData.find((key) => !Object.keys(req.body).includes(key));
  if (test)
    return res.status(400).json({
      error: "Missing fields in request body",
    });

  const foundTitle = books.find((book) => book.title === req.body.title);
  if (foundTitle !== undefined)
    return res.status(409).json({
      error: "A book with the provided title already exists",
    });

  const book = { id: id, ...req.body };
  books.push(book);
  res.status(201).json({ book });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (book === undefined) {
    return res.status(404).json({
      error: "A book the provided ID does not exist",
    });
  }
  res.json({ book });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1)
    return res.status(404).json({
      error: "A book the provided ID does not exist",
    });

  const book = books.splice(bookIndex, 1)[0];
  res.json({ book });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const title = req.body.title;
  const book = { id: id, ...req.body };
  const bookIndex = books.findIndex((book) => book.id === id);
  const requiredData = [
    "title",
    "type",
    "author",
    "topic",
    "publicationDate",
    "pages",
  ];
  const test = requiredData.find((key) => !Object.keys(req.body).includes(key));
  if (test)
    return res.status(400).json({
      error: "Missing fields in request body",
    });

  if (title === undefined)
    return res.status(400).json({
      error: "Missing fields in the request body",
    });

  if (bookIndex === -1)
    return res.status(404).json({
      error: "A book the provided ID does not exist",
    });

  const found = books.find((book) => book.title === title);
  if (found !== undefined)
    return res.status(409).json({
      error: "A book with the provided title already exists",
    });

  books[bookIndex] = book;
  res.json({ book });
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: "Missing body in the request",
    });

  if (book === undefined)
    return res.status(404).json({
      error: "A book the provided ID does not exist",
    });

  if (req.body.title !== undefined) {
    const found = books.find((book) => book.title === req.body.title);
    console.log(found);
    if (found !== undefined)
      return res.status(409).json({
        error: "A book with the provided title already exists",
      });
  }

  Object.assign(book, req.body);
  res.json({ book });
});

module.exports = router;
