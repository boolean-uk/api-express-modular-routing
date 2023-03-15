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
  const keys = ["title", "type", "author", "topic", "publicationDate", "pages"];
  const cantFind = keys.find((item) => !Object.keys(req.body).includes(item));
  const alreadyExists = books.find((book) => book.title === req.body.title);

  if (cantFind) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (alreadyExists !== undefined) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  } else {
    let id = books[books.length - 1].id + 1;
    const book = { ...req.body, id };
    books.push(book);

    res.status(201).json({ book: book });
  }
});

router.delete("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));

  if (book === undefined) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  } else {
    books.splice(books.indexOf(book, 1));

    res.json({ book });
  }
});

router.put("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
  const keys = ["title", "type", "author", "topic", "publicationDate", "pages"];
  const cantFind = keys.find((item) => !Object.keys(req.body).includes(item));
  const alreadyExists = books.find((book) => book.title === req.body.title);

  if (cantFind) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (book === undefined) {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  } else if (alreadyExists !== undefined) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  } else {
    Object.keys(req.body).forEach((item) => (book[item] = req.body[item]));

    res.status(200).json({ book: book });
  }
});

router.patch("/:id", (req, res) => {
  const book = books.find((book) => book.id === Number(req.params.id));
  const keys = ["title", "type", "author", "topic", "publicationDate", "pages"];
  const cantFind = keys.find((item) => !Object.keys(req.body).includes(item));
  const alreadyExists = books.find((item) => item.title === req.body.title);

  if (cantFind) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (book === undefined) {
    res.status(404).json({ error: "A book with provided ID does not exist" });
  } else if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  } else {
    Object.assign(book, req.body);

    res.json({ book });
  }
});

module.exports = router;
