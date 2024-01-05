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

function findBookByID(req, res) {
    const bookID = Number(req.params.id);
    const foundBook = books.find((user) => user.id === bookID);

    if (!foundBook)
        return res
            .status(404)
            .json({ ERROR: `A book with ID:${bookID} does not exist` });
    return foundBook;
}

router.get("/", (req, res) => {
    return res.status(200).json({ books: books });
});

router.post("/", (req, res) => {
    let newBook = req.body;

    if (!newBook.title || !newBook || !newBook.author || !newBook.type) {
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

router.get("/:id", (req, res) => {
    const foundBook = findBookByID(req, res);

    return res.status(200).json({ book: foundBook });
});

router.delete('/:id', (req, res) => {
    const foundBook = findBookByID(req, res)
    const foundBookIndex = books.indexOf(foundBook)

    books.splice(foundBookIndex, 1)
    
    return res.status(200).json({book: foundBook})
})

router.put("/:id", (req, res) => {
    const foundBook = findBookByID(req, res);
    const updateInfo = req.body;

    if (!updateInfo || !updateInfo.title || !updateInfo.type || !updateInfo.author) {
        return res
            .status(400)
            .json({ ERROR: "Missing fields in request body" });
    }

    if (bookMatch(updateInfo)) {
        return res
            .status(409)
            .json({ ERROR: "A user with the provided title already exists" });
    }

    foundBook.title = updateInfo.title;
    foundBook.type = updateInfo.type;
    foundBook.author = updateInfo.author
    foundBook.pages = updateInfo.pages

    return res.status(200).json({ book: foundBook });
});


module.exports = router