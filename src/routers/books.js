// Import data here...
const { books } = require('../../data/index.js')

// Write routes here...
const express = require('express')
const router = express.Router()

let bookCounter = 4
//Defining a function named bookMatch that takes a parameter newBook
function bookMatch(newBook) {
    const foundBook = books.find((book) => book.title === newBook.title);
    //check if a book with the same title as newBook already exists
    if (foundBook) return true;
    return false;
}
// Defining a function to find a book by ID
function findBookByID(req, res) {
    const bookID = Number(req.params.id);
    const foundBook = books.find((user) => user.id === bookID);

    if (!foundBook)
        return res
            .status(404)
            .json({ error: 'A book the provided ID does not exist' });
    return foundBook;
}
module.exports = router