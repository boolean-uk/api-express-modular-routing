const express = require('express')
const router = express.Router()


const data = require('../../data/index.js')
const books = data.books


const booksCounter = books.length

function findBookById(req, res) {
    const bookId = Number(req.params.id)

    const foundBook = books.find((book) => {book.id === bookId})
}

router.get('/', (req, res) => {
    return res.status(200).json({books})
})

router.get('/:id', (req, res) => {
    findBookById()
    return res.status(200).json(findBookById)
 
})

router.post('/books', (req, res) => {
    let newBook = req.body

    newBook = {id: booksCounter, ...newBook}
    books.push(newBook)
    return res.status(201).json({newBook})
})

router.put('/:id', (req, res) => {
    const updateBookInfo = req.body

    const book = findBookById(req, res)

    book.title = updateBookInfo.title
    book.type = updateBookInfo.type
    book.author = updateBookInfo.author
    book.pages = updateBookInfo.pages

    return res.status(200).json({book})
})

router.patch('/:id',(req,res) => {
    const foundBook = findBookById(req,res)
    
    foundBook.title = title ? title : foundBook.title;
    foundBook.type = type ? type : foundBook.type;
    foundBook.author = author ? author : foundBook.author;
    foundBook.pages = pages ? pages : foundBook.pages;

    return res.status(200).json({ foundBook });

})

module.exports = router


