const { books } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

const findBook = (id) => {
    return books.find(book => book.id === parseInt(id))
}

router.get('/', (req, res) => {
    res.json({ books })
})

router.post('/', (req, res) => {
    const body = req.body
    const newBook = { id: books.length + 1, ...body }
    books.push(newBook)
    res.status(201).json({ book: newBook })
})

router.get('/:id', (req, res) => {
    const book = findBook(req.params.id)
    if (book) {
        res.json({ book })
    } else {
        res.status(404).json({ error: 'Book not found' })
    }
})

router.delete('/:id', (req, res) => {
    const book = findBook(req.params.id)
    if (book) {
        books.splice(books.indexOf(book), 1)
        res.json({ book })
    } else {
        res.status(404).json({ error: 'Book not found' })
    }
})

router.put('/:id', (req, res) => {
    const book = findBook(req.params.id)
    if (book) {
        Object.assign(book, req.body)
        res.json({ book })
    } else {
        res.status(404).json({ error: 'Book not found' })
    }
})

module.exports = router;