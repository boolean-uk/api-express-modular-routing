const express = require('express')
const router = express.Router()
const { books } = require('../../data/index')
const FieldsErrorHandler = require('../helpers/FieldsErrorHandler')
const ErrorConstructor = require('../helpers/ErrorConstructor')

// Global variables
let bookId = books.length + 1

// Global functions
const findBookById = (id) => {
  const foundBook = books.find((book) => book.id === Number(id))

  if (!foundBook) {
    throw ErrorConstructor('A book the provided ID does not exist', 404)
  }

  return foundBook
}

const titleErrorHandler = (title) => {
  const foundTitle = books.find((book) => book.title === title)

  if (foundTitle) {
    throw ErrorConstructor('A book with the provided title already exists', 409)
  }

  return
}

// Retrieve a list of books
router.get('/', (req, res, next) => {
  res.status(200).json({
    books: books
  })
})

// Create a book
router.post('/', (req, res, next) => {
  try {
    const { title, type, author } = req.body

    // Error handlers
    FieldsErrorHandler([title, type, author])
    titleErrorHandler(title)

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
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Get a book by ID
router.get('/:id', (req, res, next) => {
  try {
    const foundBook = findBookById(req.params.id)

    res.status(200).json({ book: foundBook })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Delete a book by ID
router.delete('/:id', (req, res, next) => {
  try {
    const foundBook = findBookById(req.params.id)

    books.splice(
      books.findIndex((book) => book.id === foundBook.id),
      1
    )

    res.status(200).json({ book: foundBook })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Update a book by ID
router.put('/:id', (req, res, next) => {
  try {
    const { title, type, author } = req.body

    // Errors handlings
    FieldsErrorHandler([title, type, author])
    titleErrorHandler(title)

    const foundBook = findBookById(req.params.id)

    foundBook.title = title
    foundBook.type = type
    foundBook.author = author

    res.status(200).json({ book: foundBook })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

module.exports = router
