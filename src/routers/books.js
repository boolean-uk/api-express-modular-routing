// Import data here...
const { books } = require('../../data/index')

const router = require('express').Router()

// Write routes here...

id = 4
router.get('/', (req, res) => {
    res.send({books})
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = books.find((book) => book.id === id)
    res.send({book: found})
})

router.post('/', (req, res) => {
  id++;
  const newBook = {...req.body, id}
  books.push(newBook)
  res.status(201).json({book: newBook})
})

router.put('/:id', (req, res)=> {
    const id = Number(req.params.id)
    const found = books.find((book) => book.id === id)
    const updatedBook = {...found, ...req.body}
    books[books.indexOf(found)] = updatedBook
    res.send({book: updatedBook})
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = books.findIndex((book) => book.id == id)
    const book = books.splice(found,1)[0]
    res.send({book: book})
})
module.exports = router