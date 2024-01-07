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


module.exports = router