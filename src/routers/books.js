// Import data here...

const express = require("express");
const router = express.Router();

const { books } = require("../../data/index.js");

// get all user
router.get("/", (req, res) => {
  res.json({ books: books });
});
// create user
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.type || !req.body.author) {
    res.status(400).json({ error: "Missing fields in request body" });
    return;
  }

  const alreadyExists = books.find((book) => book.title === req.body.title);
  if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
    return;
  }

  const book = { ...req.body, id: books.length + 1 };
  books.push(book);
  res.status(201).json({ book: book });
});

// get user by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  res.json({ book: book });
});

// delete user by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  books.splice(books.indexOf(book), 1);
  res.status(200).json({ book: book });
  //   console.log("hello",)
});
// edit user by id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  const alreadyExists = books.find((book) => book.title === req.body.title);

  if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
    return;
  }
  Object.keys(req.body).forEach((prop) => (book[prop] = req.body[prop]));
  res.json({ book: book });
});

module.exports = router;

// Write routes here...
