const { books } = require('../../data/index')

let bookId = 0

const initBookId = () => {
  books.forEach((book) => {
    if (book.id > bookId) {
      bookId = book.id
    }
  })
}

initBookId()

const getNewBookId = () => ++bookId

const duplicate = (title, author, type) => !!books.find((book) => {
  book.title === title
  book.author === author
  book.type === type
})
const findBookById = (id) => books.find((book) => book.id === id)
const findBookIndexById = (id) => books.find((book) => book.id === id)

class Book {
  constructor(title, author, type){
    this.id = getNewBookId()
    this.title = title
    this.author = author
    this.type = type
  }
}

// Write routes here...

const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
  res.json({ books })
)

router.post('/', (req, res) => {
  const { title, author, type } = req.body

  if (!title || !author || !type) {
    res.status(400).json( { "error": "Missing fields in request body"})
  }

  if (duplicate(title, author, type)) {
    res.status(409).json({ "error": "A book with the provided title, author and type already exists" })
  }

  const book = new Book(title, author, type)
  if (book) {
    books.push(book)
    res.status(201).json({ book })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const book = findBookById(Number(id))

  if (book) {
    res.json({ book })
  } else {
    res.status(404).json({ "error": "A book with the provided ID does not exist" })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const book = findBookById(Number(id))
  const index = findBookIndexById(Number(id))

  if (book) {
    books.splice(index, 1)
    res.json({ book })
  } else {
    res.status(404).json({ "error": "A book with the provided ID does not exist" })
  }
})

module.exports = router