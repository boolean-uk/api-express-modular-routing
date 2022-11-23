const express = require("express")
const router = express.Router()
const { books } = require("../../data")
let bookId = books.length

router.get("/", (req, res) => {
  res.json({ books })
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const book = books.find((book) => book.id === id)

  if(!book) {
    return res.status(404).json({error: 'error'})
  }

  res.json({ book })
})

router.post("/", (req, res) => {
  

  if(!req.body.title || !req.body.type || !req.body.author
    || !req.body.topic || !req.body.publicationDate || !req.body.pages) {
      return res.status(400).json({error: 'error'})
  }

  const bookWithTitleExists = books.find((book) => book.title === req.body.title)

  if(bookWithTitleExists) {
    return res.status(409).json({error: 'error'})
  }

  bookId++

  const book = {
    ...req.body,
    id: bookId,
  }

  books.push(book)

  res.status(201).json({ book: book })
})

router.put("/:id", (req, res) => {
  if(!req.body.title || !req.body.type || !req.body.author
    || !req.body.topic || !req.body.publicationDate || !req.body.pages) {
      return res.status(400).json({error: 'error'})
  }
  const id = Number(req.params.id)
  const updatedBook = req.body

  const bookWithTitleExists = books.find((book) => book.title === updatedBook.title)

  if(bookWithTitleExists) {
    return res.status(409).json({error: 'error'})
  }

  const bookId = books.findIndex((book) => book.id === id)
  if(bookId < 0) {
    return res.status(404).json({error: 'error'})
  }
  books[bookId] = { ...books[bookId], ...updatedBook }

  res.json({ book: books[bookId] })
})

router.patch("/:id", (req, res) => { 
  const id = Number(req.params.id)
  const updatedBook = req.body

  const bookWithTitleExists = books.find((book) => book.title === updatedBook.title)

  if(bookWithTitleExists) {
    return res.status(409).json({error: 'error'})
  }

  const bookId = books.findIndex((book) => book.id === id)
  if(bookId < 0) {
    return res.status(404).json({error: 'error'})
  }
  books[bookId] = { ...books[bookId], ...updatedBook }

  res.json({ book: books[bookId] })
})

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  const bookId = books.findIndex((book) => book.id === id)
  const book = books[bookId]
  if(!book) {
    return res.status(404).json({error: 'error'})
  }
  books.splice(bookId, 1)

  res.json({ book })
})

module.exports = router
