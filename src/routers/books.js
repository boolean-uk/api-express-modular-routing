const express = require("express")
const router = express.Router()
const { books } = require("../../data/index")
const { getNewBookDetails, createBook, formatBook, findBook } = require("../functions/bookFunctions.js")

let currentBookId = 4

// GET ALL BOOKS
router.get("/", (req, res) => {
    return res.status(200).json({ books })
})

// CREATE A BOOK
router.post("/", (req, res) => {
    const details = getNewBookDetails(req)
    const newBook = createBook(details, currentBookId, books)
    return res.status(201).json(formatBook(newBook))
})

// GET BOOK BY ID
router.get("/:id", (req, res) => {
    const book = findBook(req, res, books)
    return res.status(200).json(formatBook(book))
})

module.exports = router