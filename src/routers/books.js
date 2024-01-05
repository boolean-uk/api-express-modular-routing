// Import data here...
const express = require('express')
const {books} = require("../../data/index")
const router = express.Router()


// Get request for all books 
router.get("/", (req, res) => {
res.status(200).json({books: books})
})

// Get request for a single id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id)

    if(book){
        res.status(200).json({book: book})
    } else {
        res.status(404).json({error: "No such book with this id"})
    }
})

// Post request to create new book
router.post("/", (req, res) => {
    const newBook = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    return res.status(201).json({book: newBook})
})

// Put request to update books
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundBook = books.find(book => book.id === id)
    
    const updates = req.body;
    Object.assign(foundBook, updates)
    
    return res.status(200).json({book: foundBook})
    })

    // Delete request to delete book
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundBookId = books.findIndex(book => book.id === id)

    if(foundBookId === -1){
        return res.status(404).json({error: "No such book with this id"})
    }

    const deleteBook = books.splice(foundBookId, 1)[0];

    return res.status(200).json({book: deleteBook})
})
    
// Write routes here...
module.exports = router