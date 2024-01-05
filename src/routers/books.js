const express = require("express");
const router = express.Router();
const data = require("../../data/index");
const books = data.books;

const doesTitleExist = (title, res) => {
  const foundTitle = books.find((book) => book.title === title);
  if (foundTitle) {
    return res
      .status(409)
      .json({ error: "A book with the provided title already exists" });
  }
};
const hasAllFields = (body, res) => {
  if (!body.title || !body.type || !body.author) {
    return res
      .status(400)
      // the string in the API spec is "Missing fields in THE request body", 
      // but the test expects it without 'the'
      // good 'spot-the-string-typo' practice? 
      .json({ error: "Missing fields in request body" });
  }
};
const findById = (id, res) => {
    const idNum = parseInt(id)
    const foundBook = books.find((book) => book.id === idNum)
    if (!foundBook) {
        return res.status(404).json("A book with the provided ID does not exist")
    }
    return foundBook
}

router.get("/", (req, res) => res.json({ books: books }));

router.post("/", (req, res) => {
  const newBook = req.body;
  hasAllFields(newBook, res);
  doesTitleExist(newBook.title, res);

  const id = books.length + 1;
  newBook.id = id;

  books.push(newBook);

  return res.status(201).json({ book: newBook });
});

router.get('/:id', (req, res) => {
    const {id} = req.params
    const foundBook = findById(id, res)
    return res.json({"book": foundBook})
} )

module.exports = router;
