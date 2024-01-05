// Import data here...
const { books } = require('../../data/index.js')

// Write routes here...
const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    return res.status(200).json({ books: books });
});



module.exports = router