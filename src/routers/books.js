// For the data, import the module from the file
const { books } = require("../../data");

// This enables the use of express router
const router = require("express").Router();

// ROUTES

router.get("/", (req, res) => {
  res.json({ books });
});

router.get("/:id", (req, res) => {
  const book = findBook(req.params.id);
  res.json({ book });
});

router.post("/", (req, res) => {
  const newId = books[books.length - 1].id + 1;
  const book = { ...req.body, id: newId };
  books.push(book);
  res.status(201).json({ book });
});

router.put("/:id", (req, res) => {
  const book = findBook(req.params.id);
  const updatedBook = { id: book.id, ...req.body };
  books[books.indexOf(book)] = updatedBook;
  res.json({ book: updatedBook });
});

router.delete("/:id", (req, res) => {
  const book = findBook(req.params.id);
  books.splice(books.indexOf(book), 1);
  res.json({ book });
});

function findBook(id) {
  return books.find((book) => book.id == id);
}

module.exports = router;
