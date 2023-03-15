const { books } = require('../../data/index.js');

const getAll = (req, res) => {
    res.json({ books });
};

const getBookById = (req, res) => {
    const book = books.find((book) => book.id === Number(req.params.id));
    if (book === undefined) {
        res.status(404).json({
            error: 'A book the provided ID does not exist',
        });
    }
    res.json({ book });
};

const createBook = (req, res) => {
    // alternative way:
    // let id = books[books.length - 1].id + 1;
    // const newBook = { ...req.body, id };
    if (
        req.body.title === undefined ||
        req.body.type === undefined ||
        req.body.author === undefined
    ) {
        res.status(400).json({ error: 'Missing fields in request body' });
    }

    if (books.find((book) => book.title === req.body.title) !== undefined) {
        res.status(409).json({
            error: 'A book with the provided title already exists',
        });
    }
    const newBook = req.body;
    newBook.id = books[books.length - 1].id + 1;
    console.log();
    books.push(newBook);
    res.status(201).json({ book: newBook });
};

const deleteBookById = (req, res) => {
    const book = books.find((book) => book.id === Number(req.params.id));

    if (book === undefined) {
        res.status(404).json({
            error: 'A book the provided ID does not exist',
        });
    }

    books.splice(books.indexOf(book, 1));
    res.json({ book });
};

const updateBookById = (req, res) => {
    if (
        req.body.title === undefined ||
        req.body.type === undefined ||
        req.body.author === undefined
    ) {
        res.status(400).json({ error: 'Missing fields in request body' });
    }

    const book = books.find((book) => book.id === Number(req.params.id));

    if (book === undefined) {
        res.status(404).json({
            error: 'A book the provided ID does not exist',
        });
    }

    if (books.find((book) => book.title === req.body.title) !== undefined) {
        res.status(409).json({
            error: 'A book with the provided title already exists',
        });
    }

    Object.keys(req.body).forEach((item) => (book[item] = req.body[item]));
    res.json({ book });
};

module.exports = {
    getAll,
    getBookById,
    createBook,
    deleteBookById,
    updateBookById,
};
