const express = require('express')
const router = express.Router()
const { books } = require('../../data/index')

// Global variables
let bookId = books.length + 1

// Global functions
const findBookById = (id) => {
  const foundBook = books.find((book) => book.id === Number(id))

  return foundBook
}

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

// Get a book by ID
router.get('/:id', (req, res, next) => {
  const foundBook = findBookById(req.params.id)

  res.status(200).json({ book: foundBook })
})

// Delete a book by ID
router.delete('/:id', (req, res, next) => {
  const foundBook = findBookById(req.params.id)

  books.splice(
    books.findIndex((book) => book.id === foundBook.id),
    1
  )

  res.status(200).json({ book: foundBook })
})

// Update a book by ID
router.put('/:id', (req, res, next) => {
  const { title, type, author } = req.body

  const foundBook = findBookById(req.params.id)

  foundBook.title = title
  foundBook.type = type
  foundBook.author = author

  res.status(200).json({ book: foundBook })
})

module.exports = router
