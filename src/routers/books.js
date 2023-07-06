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
    const checkTitle = books.find((book) => book.title === body.title)

    if(checkTitle) {
        return res.status(409).send({ error: "A book with the provided title already exists"})
    }
    if (body.title.length !== 0 && body.type.length !== 0 && body.author.length !== 0) {
        books.push(newBook)
        id++
        return res.status(201).send({ book: newBook })
    } else {
        return res.status(400).send({ error: "A book with the provided title already exists"})
    }
})

// GET a book by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find((book) => book.id === id)

    if (book) {
        return res.send({ book })
    } else {
        return res.status(404).send({ error: "A book the provided ID does not exist"})
    }
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
        return res.status(404).send({ error: "A book the provided ID does not exist"})
    }
})

// PUT Update a book by ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body
    const checkId = books.find((book) => book.id === id)
    const checkTitle = books.find((book) => book.title === body.title)

    if (body.title.length === 0 || body.type.length === 0 || body.author.length === 0) {
        return res.status(400).send({ error: "Missing fields in the request body"})
    }
    if (!checkId) {
        return res.status(404).send({ error: "A book the provided ID does not exist"})
    }
    if (checkTitle) {
        return res.status(409).send({ error: "A book with the provided title already exists"})
    }
    if (body.title.length !== 0 && body.type.length !== 0 && body.author.length !== 0) {
        let updatedBook = books.find((book) => book.id === id)
        Object.assign(updatedBook, body)
        return res.send({book: updatedBook})
    } 
})

module.exports = router