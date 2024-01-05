const { books } = require('../../data/index')

let bookId = 0
const getNewBookId = () => ++bookId

class Book {
  constructor(title, author, type){
    this.id = getNewBookId()
    this.title = title
    this.author = author
    this.type = type
  }
}

// Write routes here...

const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
  res.json({ books })
)

module.exports = router