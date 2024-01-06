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

// Create a book
router.post('/', (req, res, next) => {
  const { title, type, author } = req.body

  const createdBook = {
    id: bookId++,
    title,
    type,
    author
  }

  books.push(createdBook)

  res.status(201).json({
    book: createdBook
  })
})

module.exports = router
