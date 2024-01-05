// Import data here...
const express = require('express')
const {books} = require("../../data/index")
const router = express.Router()


// Get request for all films 
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

// Write routes here...
module.exports = router