const { books } = require("../../data");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ books });
});

router.get("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
  if (book !== undefined) {
    res.json({ book: book });
  } else {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
});

router.post("/", (req, res) => {
  let id = books[books.length - 1].id + 1;

  const book = { ...req.body, id };
  books.push(book);
  res.status(201).json({ book: book });
});

router.delete("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
  books.splice(books.indexOf(book, 1));

  res.json({ book });
});

router.put("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
  Object.keys(req.body).forEach((item) => (book[item] = req.body[item]));

  res.status(200).json({ book: book });
});

module.exports = router;
