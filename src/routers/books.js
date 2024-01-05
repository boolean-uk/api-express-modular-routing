const express = require('express')
const router = express.Router()
const data = require('../../data/index')
const books = data.books

router.get("/", (req, res) => (res.json({books: books})))

module.exports = router