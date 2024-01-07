// Import data here...
const express = require("express")
const router = express.Router()

const data = require('../../data/index')
const books = data.books

let lastBookId = 4

//const { books } = require('../../data/index');

// Write routes here...

const findBook = (req, res) => {
    const bookId = Number(req.params.id);
  
    const foundBook = books.find((book) => book.id === bookId);
  
    if (!foundBook) {
      res.status(404).json({ error: `A book with ID: ${userId} does not exist`});
    }
  
    return foundBook;
};
router.get('/', (req, res) =>{
    res.status(200).json({books})
})

router.post('/', (req, res) =>{
    const body = req.body
    const newBook = {
        ...body,
        id: ++lastBookId
    }
    books.push(newBook)

    res.status(201).json({book: newBook})
})

router.get('/:id', (req, res) =>{
    const bookId = Number(req.params.id)

    const foundBook = findBook(req, res)

    res.status(200).json({book:foundBook})
})

router.delete('/:id', (req, res) =>{
    const bookId = Number(req.params.id)

    const bookIndex = books.indexOf((book) => book.id === bookIndex)

    const bookToBeDeleted = findBook(req, res)

    books.splice(bookIndex, 1)

    res.status(200).json({book: bookToBeDeleted})



})

router.put('/:id', (req, res) =>{
    const bookId = Number(req.params.id)
    
    const editBook = findBook(req, res)

    if(editBook){
        const {title, type, author, pages} = req.body

        editBook.title = title
        editBook.type = type
        editBook.author = author
        editBook.pages = pages
    }

    res.status(200).json({book:editBook})
})

router.patch('/:id', (req, res) => {
    const bookId = Number(req.params.id);
    const bookToPatch = findBook(req, res);
    
    const { title } = req.body;

    if (bookToPatch.title === title) {
        return res.status(400).json({ "error": "New title should be different from the old title" });
    }

    bookToPatch.title = title;

    res.status(200).json({book: bookToPatch});
});

module.exports = router

