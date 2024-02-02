const { books } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ books })
})

router.post('/', (req, res) => {
    const body = req.body
    const newBook = { id: books.length + 1, ...body }
    books.push(newBook)
    res.status(201).json({ book: newBook })
})

module.exports = router;