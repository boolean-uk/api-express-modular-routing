// Import data here...
const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const books = data.books;

// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ books: books });
});
console.log(books);
module.exports = router;
