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

  res.json({ book })
})

router.post("/", (req, res) => {
  bookId++

  const book = {
    ...req.body,
    id: bookId,
  }

  books.push(book)

  res.status(201).json({ book: book })
})

router.put("/:id", (req, res) => {
  const id = Number(req.params.id)
  const updatedBook = req.body
  const bookId = books.findIndex((book) => book.id === id)
  books[bookId] = { ...books[bookId], ...updatedBook }

  res.json({ book: books[bookId] })
})

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id)
  const bookId = books.findIndex((book) => book.id === id)
  const book = books[bookId]
  books.splice(bookId, 1)

  res.json({ book })
})

module.exports = router
