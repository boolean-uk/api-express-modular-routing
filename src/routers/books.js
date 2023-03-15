// Import data here...
const { books } = require("../../data");
const router = require("express").Router();

let id = books.length;

router.get("/", (req, res) => {
  res.status(200).json({ books });
});

//GET /users/:id
router.get("/:id", (req, res) => {
  //   ... code
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  // if (!book) {
  //   res.status(404).json("A book the provided ID does not exist");
  // } else {
  res.json({ book });
  // }
});

router.post("/", (req, res) => {
  // if missing fields: res(400)({"missing fields in req body"})
  if (!req.body) {
    // res.status(400).json({ book });
  }

  // if already exists: res(409)({"book already exists"})

  id++;
  const book = { ...req.body, id };
  books.push(book);

  res.status(201).json({ book });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((person) => person.id === id);
  const book = books.splice(index, 1)[0];
  // ...find
  // if !id: 404({"book doesn't exist"})
  res.status(200).json({ book });
});

//PUT (update) by id
router.put("/:id", (req, res) => {
  //    ...code
  const foundbook = books.find((book) => book.id === Number(req.params.id));

  const book = { ...foundbook, ...req.body };
  console.log("book:", book);
  books[books.indexOf(foundbook)] = book;

  // if missing fields: res(400)({"missing fields in req body"})
  // if doesn't exist: res(404)({"book doesn't exist"})
  // if already exists: res(409)({"book already exists"})
  res.status(200).json({ book });
});

module.exports = router;
