// Import data here...
const express = require('express')
const {books} = require("../../data/index")
const router = express.Router()


// Get request for all films 
router.get("/", (req, res) => {
res.status(200).json({books: books})
})

// Write routes here...
module.exports = router