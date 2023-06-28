// Import data here...
const express = require('express')
const router = express.Router()
let { books } = require('../../data/index')

// Write routes here...
let newId = books.length

router.get('/', (req, res) => {
	return res.send({ books })
})
router.post('/', (req, res) => {
	newId++
	const newBook = {
		...req.body,
		id: newId,
	}
	books.push(newBook)
	return res.status(201).send({ book: newBook })
})
router.get('/:id', (req, res) => {
	const id = Number(req.params.id)
	const book = books.find((book) => book.id === id)
	return res.send({ book: book })
})

router.delete('/:id', (req, res) => {
	const id = Number(req.params.id)
	const book = books.find((book) => book.id === id)

	if (book) {
		books = books.filter((book) => book.id !== id)
		return res.send({ book: book })
	}
})

router.put('/:id', (req, res) => {
	const id = Number(req.params.id)
	const updatedBooks = req.body
	const booksToUpdate = books.find((book) => book.id === id)

	Object.assign(booksToUpdate, updatedBooks)

	const newBook = books.find((book) => book.id === id)
	return res.send({ book: newBook })
})

module.exports = router
