const express = require('express')
const router = express.Router()
const { books } = require('../../data/index')

// Global variables
let bookId = books.length + 1

// Retrieve a list of books
router.get('/', (req, res, next) => {
  res.status(200).json({
    books: books
  })
})

module.exports = router
