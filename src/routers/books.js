// Import data here...
const { books } = require('../../data')
const router = require('express').Router()

// Write routes here...
router.get('/', (req, res) => {
    res.json({books})
})
router.get('/:id', (req, res) => {
    const book = books.find((obj) => obj.id === Number(req.params.id))
    if (book === undefined) {
        res.status(404).json({ error: "A book the provided ID does not exist" })
    }
    else {
        res.status(200).json({book})
    }
})

router.post('/', (req, res) => {
    const expectedkeys = [
        "title", 
        "type",  
        "author",
        "topic",
        "publicationDate",    
        "pages"
    ]
    const dontMatch = expectedkeys.find((item) => !Object.keys(req.body).includes(item))
    const foundTitle = books.find((obj) => obj.title === req.body.title)
    if(dontMatch) {
        res.status(400).json({ error: "Missing fields in request body"})
    } else if(foundTitle !== undefined) {
        res.status(409).json({error: 'A book with the provided title already exists'})
    } else {
        const id = books[books.length - 1].id + 1
        const book = { ...req.body, id }
        books.push(book)
        res.status(201).json({ book })
    }
})

router.put('/:id', (req, res) => {
    const expectedkeys = [
        "title",
        "type",
        "author",
        "topic",
        "publicationDate",
        "pages"
    ]
    const dontMatch = expectedkeys.find((item) => !Object.keys(req.body).includes(item))
    const foundTitle = books.find((obj) => obj.title === req.body.title)
    const book = books.find((obj) => obj.id === Number(req.params.id))
    if(dontMatch) {
        res.status(400).json({ error: "Missing fields in request body"})
    } else if(book === undefined) {
        res.status(404).json({ error: "A book the provided ID does not exist"})
    } else if(foundTitle !== undefined) {
        res.status(409).json({ error: "A book with the provided title already exists"})
    } else {
        Object.keys(req.body).forEach((prop) => book[prop] = req.body[prop])
        res.status(200).json({ book })
    }
})

router.patch("/:id", (req, res) => {
    const book = books.find((book) => book.id === Number(req.params.id));
    const expectedKeys = [
        "title", 
        "type", 
        "author", 
        "topic", 
        "publicationDate", 
        "pages"
    ];
    const dontMatch = expectedKeys.find((item) => !Object.keys(req.body).includes(item));
    const found = books.find((item) => item.title === req.body.title);

    if (dontMatch) {
        res.status(400).json({ error: "Missing fields in request body" });
    } else if (book === undefined) {
        res.status(404).json({ error: "A book with provided ID does not exist" });
    } else if (found) {
        res.status(409).json({ error: "A book with the provided title already exists" });
    } else {
        Object.assign(book, req.body);
        res.json({ book });
    }
});

router.delete('/:id', (req, res) => {
    const book = books.find((obj) => obj.id === Number(req.params.id))
    if(book === undefined) {
        res.status(404).json({ error: "A book the provided ID does not exist"})
    } else {
        const index = books.indexOf(book)
        books.splice(index, 1)
        res.status(200).json({ book })
    }
})

module.exports = router