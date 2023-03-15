// Import data here...
const { books } = require('../../data')
const router = require('express').Router()

// Write routes here...
router.get('/', (req, res) => {
    res.json({books})
})
router.get('/:id', (req, res) => {
    const book = books.find((obj) => obj.id === Number(req.params.id))
    res.json({book})
})

router.post('/', (req, res) => {
    const id = books[books.length - 1].id + 1
    const book = { ...req.body, id }
    books.push(book)
    res.status(201).json({ book })
})

router.put('/:id', (req, res) => {
    const book = books.find((obj) => obj.id === Number(req.params.id))
    Object.keys(req.body).forEach((prop) => book[prop] = req.body[prop])
    res.status(200).json({ book })
})

router.delete('/:id', (req, res) => {
    const book = books.find((obj) => obj.id === Number(req.params.id))
    const index = books.indexOf(book)
    books.splice(index, 1)
    res.status(200).json({ book })
})

module.exports = router