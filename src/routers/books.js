// Import data here...
const express = require('express')
const router = express.Router()
const data = require('../../data/index.js')
const books = require('../../data/index.js').books

// Write routes here...

// GET all books
router.get('/', (req, res) => {
  res.status(200).json({ books })
})

// POST a new book
router.post('/', (req, res) => {
  if (
    req.body.title === undefined ||
    req.body.type === undefined ||
    req.body.author === undefined
  ) {
    res.status(400).json({ error: 'Missing fields in the request body' })
  }
  if (books.find((book) => book.title === req.body.title)) {
    res.status(409).json({ error: 'A book with the provided title already exists'})
  }
  let id = books[books.length - 1].id + 1
  const newBook = { ...req.body, id }
  books.push(newBook)
  res.status(201).json({ book: newBook})
})

//GET a book by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const bookFound = books.find((book) => book.id === id)
  if (bookFound) {
    res.status(200).json({ book: bookFound })
  } else {
    res.status(404).json({ error: 'A book with the provided ID does not exist' })
  }
})

// DELETE a book by ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const bookIndex = books.findIndex((book) => book.id === id)
  if (bookIndex !== -1) {
    const deletedbook = books.splice(bookIndex, 1)[0]
    res.status(200).json({ book: deletedbook })
  } else {
    res.status(404).json({ error: 'A book with the provided ID does not exist'})
  }
})

// PUT update a book by ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedBook = { ...req.body, id }
  const bookIndex = books.findIndex((book) => book.id === id)

  if (
    req.body.title === undefined ||
    req.body.type === undefined ||
    req.body.author === undefined
  ) {
    res.status(400).json({ error: 'Missing fields in the request body' })
  }

  if (bookIndex === -1) {
    res.status(404).json({ error: 'A book with the provided ID does not exist' })
  }

  if (books.findIndex((book) => book.title === req.body.title) !== -1) {
    res.status(409).json({ error: 'A book with the provided title already exists'})
  }

  books[bookIndex] = updatedBook
  res.status(200).json({ book: updatedBook })
})



// {
//   id: 1,
//   title: "1984",
//   type: "fiction",
//   author: "George Orwell",
//   pages: 5
// }

module.exports = router;