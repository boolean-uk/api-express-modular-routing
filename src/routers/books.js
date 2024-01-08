// Import data here...
const express = require('express')
const router = express.Router()

const { books } = require('../../data/index.js')

const findBook = (req, res) => {
    const id = req.params.id
    const foundBook = books.find((user) => user.id === Number(id))

    if(!foundBook) {
        res.status(404).json({error: "A book the provided ID does not exist"})
    }
    return foundBook
}


router.get('/', (req, res) => {
    return res.status(200).json({books})
})


router.post('/', (req, res) => {
    const newBook = req.body
    newBook.id = books.length + 1
    const bodyValues = Object.values(req.body)

    if(bodyValues) {
        return res.status(400).json({ error: "Missing fields in request body"})
    }

    const doesBookExist = books.find((book) => book.title === newBook.title)

    if(doesBookExist) {
        return res.status(409).json({ error: "A book with the provided title already exists"})
    }
    books.push(newBook)
    return res.status(201).json({book: newBook})
})

router.get('/:id', (req, res) => {
    const foundBook = findBook(req, res)
    if(foundBook) {
        return res.status(200).json({book: foundBook})
    }
})


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const bookToDelete = books.findIndex((book) => book.id === id)

    if(bookToDelete !== -1) {
        const [deletedBooks] = books.splice(bookToDelete, 1)
        return res.status(200).json({book: deletedBooks})
    }

    return res.status(404).json({error: "not fpubnd "})
})


router.put('/:id', (req, res) => {
    const foundBook = findBook(req, res)
    const bodyValues = Object.values(req.body);

    if (bodyValues.some(value => !value)) {
      return res.json({ error: "Missing fields in request body"});
    }

    const doesBookExist = books.find((book) => book.title === foundBook.title)
    if(doesBookExist) {
        return res.status(409).json({error: "A book with the provided title already exists"})
    }

    Object.assign(foundBook, req.body)
    return res.status(200).json({book: foundBook})

    
})




module.exports = router

// Write routes here...
