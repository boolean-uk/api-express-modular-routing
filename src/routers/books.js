const { books } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ books })
})

module.exports = router;