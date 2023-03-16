// Import data here...
const router = require("express").Router();

const data = require("../../data");
const books = data.books;
// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ books });
});

router.post("/", (req, res) => {
  const book = req.body;
  book.id = books[books.length - 1].id + 1;
  books.push(book);

  res.status(201).json({ book });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);
  res.status(200).json({ book });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);
  const userIndex = books.findIndex((book) => book.id === id);
  books.splice(userIndex, 1);

  res.status(200).json({ book });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = req.body;
  const userIndex = books.findIndex((book) => book.id === id);
  book.id = books[userIndex].id;
  books[userIndex] = book;

  res.status(200).json({ book });
});

module.exports = router;