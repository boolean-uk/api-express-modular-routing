const express = require('express');
const { books } = require('../../data/index')
const router = express.Router();

let id = 5

// GET books
router.get('/', (req, res) => {
    res.json({ books })
})

// POST Create a book
router.post('/', (req, res) => {
    const body = req.body
    const newBook = {id: id, ...body}
    books.push(newBook)
    id++

    return res.status(201).send({ book: newBook })
})

// GET a book by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find((book) => book.id === id)

    return res.send({ book })
})

// DELETE a book by ID
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    let bookIndex = -1
    const book = books.find((book, index) => {
        if (book.id === id) {
            bookIndex === index
            return true
        } else {
            return false
        }
    })

    if (book) {
        books.splice(bookIndex, 1)
        return res.send({ book })
    } else {
        return res.status(404).send({ error: "string"})
    }
})

// PUT Update a book by ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    
    let updatedBook = books.find((book) => book.id === id)
    Object.assign(updatedBook, body)
    return res.send({book: updatedBook})
})

module.exports = router