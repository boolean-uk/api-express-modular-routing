// Import data here...
const express = require('express')
const router = express.Router()

const data = require('../../data/index.js')
const {book1, book2, book3} = require('../../test/fixtures/bookData.js')

const findBook = (req, res) => {
    const bookId = Number(req.params.id);
  
    const foundBook = data.books.find((book) => book.id === bookId);
  
    if (!foundBook) {
      res
        .status(404)
        .json({ error: "A book with the provided ID does not exist" });
    }
  
    return foundBook;
  };

// Write routes here...
router.get('/', (req, res) => {
    return res.json({books: data.books})
})

module.exports = router