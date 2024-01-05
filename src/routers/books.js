const express = require('express')
const router = express.Router()
const data = require('../../data/index')
const books = data.books

router.get("/", (req, res) => (res.json({books: books})))

router.post("/", (req, res) => {
    const id = books.length + 1
    const newBook = req.body
    newBook.id = id

    books.push(newBook)

    return res.status(201).json({book: newBook})
})

module.exports = router