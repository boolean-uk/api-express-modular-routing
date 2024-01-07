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

// Handle GET request to retrieve all books
router.get("/", (req, res) => {
    return res.status(200).json({ books: books });
});

// Handle POST request to add a new book
router.post("/", (req, res) => {
    // Extract new book information from the request body
    let newBook = req.body;

    // Check if required fields are missing in the request body
    if (!newBook.title || !newBook || !newBook.author || !newBook.type) {
        return res
            .status(400)
            .json({ error: "Missing fields in request body" });
    }

    // Check if a book with the provided title already exists
    if (bookMatch(newBook)) {
        return res
            .status(409)
            .json({ error: "A book with the provided title already exists" });
    }

    // Assign a unique ID and add the new book to the array
    newBook = { id: ++bookCounter, ...newBook };
    books.push(newBook);

    // Return the newly created book
    return res.status(201).json({ book: newBook });
});

// Handle GET request to retrieve a specific book by ID
router.get("/:id", (req, res) => {
    // Find the book by ID using a helper function
    const foundBook = findBookByID(req, res);

    // Return the found book
    return res.status(200).json({ book: foundBook });
});

// Handle DELETE request to remove a book by ID
router.delete('/:id', (req, res) => {
    // Find the book by ID using a helper function
    const foundBook = findBookByID(req, res);
    const foundBookIndex = books.indexOf(foundBook);

    // Remove the book from the array
    books.splice(foundBookIndex, 1);

    // Return the deleted book
    return res.status(200).json({book: foundBook});
});

// Handle PUT request to update a book by ID
router.put("/:id", (req, res) => {
    // Extract update information from the request body
    const updateInfo = req.body;

    // Check if required fields are missing in the request body
    if (!updateInfo || !updateInfo.title || !updateInfo.type || !updateInfo.author) {
        return res
            .status(400)
            .json({ error: "Missing fields in request body" });
    }

    // Find the book by ID using a helper function
    const foundBook = findBookByID(req, res);

    // Check if a book with the provided title already exists
    if (bookMatch(updateInfo)) {
        return res
            .status(409)
            .json({ error: "A book with the provided title already exists" });
    }

module.exports = router;