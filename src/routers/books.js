const express = require("express")
const router = express.Router()
const { books } = require("../../data/index")
const { getNewBookDetails, createBook, formatBook, findBook, deleteBook } = require("../functions/bookFunctions.js")
const { route } = require("./films.js")

let currentBookId = 4

// GET ALL BOOKS
router.get("/", (req, res) => {
    return res.status(200).json({ books })
})

// CREATE A BOOK
router.post("/", (req, res) => {
    const details = getNewBookDetails(req, res, books)
    if (!details.title || !details.type || !details.author) return res.status(400).json({"error": "Missing fields in request body"})
    const newBook = createBook(details, currentBookId, books)
    return res.status(201).json(formatBook(newBook))
})

// GET BOOK BY ID
router.get("/:id", (req, res) => {
    const book = findBook(req, res, books)
    return res.status(200).json(formatBook(book))
})

// DELETE BOOK BY ID
router.delete("/:id", (req, res) => {
    const bookToDelete = findBook(req, res, books)
    deleteBook(bookToDelete, books)
    return res.status(200).json(formatBook(bookToDelete))
})

// UPDATE BOOK BY ID
router.put("/:id", (req, res) => {
    const bookToUpdate = findBook(req, res, books)
    const details = getNewBookDetails(req, res, books)
    bookToUpdate.title = details.title
    bookToUpdate.type = details.type
    bookToUpdate.author = details.author
    return res.status(200).json(formatBook(bookToUpdate))
})

module.exports = router