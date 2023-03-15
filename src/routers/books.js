const router = require("express").Router();
const { books, films } = require("../../data/index");

router.get("/", (req, res) => {
  res.send({ books });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.title || !req.body.author) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  const doesBookAlreadyExist = books.find(
    (book) => book.title == req.body.title
  );
  if (doesBookAlreadyExist) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }
  const newBook = req.body;
  newBook.id = books[books.length - 1].id + 1;
  books.push(newBook);
  res.status(201).json({ book: newBook });
});

router.get("/:id", (req, res) => {
  const book = books.find((book) => book.id == req.params.id);
  if (!book) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  res.send({ book });
});

router.delete("/:id", (req, res) => {
  const removeIndex = books.findIndex((book) => book.id == req.params.id);
  if (removeIndex === -1) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  const removedBook = books[removeIndex];
  books.splice(removeIndex, 1);
  res.status(200).json({ book: removedBook });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.type) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  const updateIndex = books.findIndex((book) => book.id == req.params.id);
  if (updateIndex === -1) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
  const doesBookAlreadyExist = books.find(
    (book) => book.title == req.body.title
  );
  if (doesBookAlreadyExist) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }
  const updatedBook = { ...books[updateIndex], ...req.body };
  books.splice(updateIndex, 1, updatedBook);
  res.status(200).json({ book: updatedBook });
});

module.exports = router;
