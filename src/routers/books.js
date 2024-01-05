const express = require("express")
const router = express.Router()
const { books } = require("../../data/index")

let currentBookId = 4

// GET ALL BOOKS
router.get("/", (req, res) => {
    return res.status(200).json({ books })
})

module.exports = router