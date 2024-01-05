// Import data here...
const { books } = require('../../data/index.js')

// Write routes here...
const express = require('express')
const router = express.Router()

let bookCounter = 4

function bookMatch(newBook) {
    const foundBook = books.find((book) => book.title === newBook.title);
    if (foundBook) return true;
    return false;
}

router.get("/", (req, res) => {
    return res.status(200).json({ books: books });
});

router.post("/", (req, res) => {
    let newBook = req.body;

    if (!newBook.title) {
        return res
            .status(400)
            .json({ ERROR: "Missing fields in request body" });
    }

    if (bookMatch(newBook)) {
        return res
            .status(409)
            .json({ ERROR: "A book with the provided title already exists" });
    }

    newBook = { id: ++bookCounter, ...newBook };
    books.push(newBook);

    return res.status(201).json({ book: newBook });
});



module.exports = router