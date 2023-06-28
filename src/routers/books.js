// Import data here...
const express = require("express");
const router = express.Router();
let { books } = require("../../data/index");

// Write routes here...
let newId = books.length;

router.get("/", (req, res) => {
  return res.send({ books });
});
router.post("/", (req, res) => {
  newId++;
  const newBook = {
    ...req.body,
    id: newId,
  };
  const title = books.find((book) => book.title === newBook.title);

  if (title) {
    return res
      .status(409)
      .send({ error: "A book with the provided title already exists" });
  }

  if (
    newBook.title !== "" &&
    newBook.title !== undefined &&
    newBook.author !== "" &&
    newBook.author !== undefined
  ) {
    books.push(newBook);
    return res.status(201).send({ book: newBook });
  }
  return res.status(400).send({ error: "Missing fields in request body" });
});
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res
      .status(404)
      .send({ error: "A book the provided ID does not exist" });
  }
  return res.send({ book: book });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (book) {
    books = books.filter((book) => book.id !== id);
    return res.send({ book: book });
  } else {
    return res
      .status(404)
      .send({ error: "A book the provided ID does not exist" });
  }
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedBooks = req.body;
  const booksToUpdate = books.find((book) => book.id === id);
  const book = books.find((book) => book.id === id);

  if (booksToUpdate) {
    Object.assign(booksToUpdate, updatedBooks);
    const title = books.find((book) => book.title === updatedBooks.title);

    if (title) {
      return res
        .status(409)
        .send({ error: "A book with the provided title already exists" });
    }
    if (
      updatedBooks.title === "" ||
      updatedBooks.title === undefined ||
      updatedBooks.author === "" ||
      updatedBooks.author === undefined ||
	  updatedBooks.type === "" ||
      updatedBooks.type === undefined
    ) {
		return res.status(400).send({ error: "Missing fields in request body" });

    } else {
		const newBook = books.find((book) => book.id === id);
		return res.send({ book: newBook });
    }
  }
  if (!book) {
    return res
      .status(404)
      .send({ error: "A book the provided ID does not exist" });
  }
});

module.exports = router;
