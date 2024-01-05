const getNewBookDetails = (req, res, data) => {
    const { title, type, author } = req.body
    if (!title || !type || !author) return res.status(400).json({"error": "Missing fields in request body"})
    const isTitleExisting = data.find(book => book.title === title)
    if (isTitleExisting) return res.status(409).json({"error":"A book with the provided title already exists"})
    return { title, type, author }
}

const createBook = (details, currentBookId, data) => {
    const newBook = {
        id: ++currentBookId,
        ...details
    }
    data.push(newBook)
    return newBook
}

const formatBook = (bookToFormat) => {
    const book = {
        "book": bookToFormat
    }
    return book
}

const findBook = (req, res, data) => {
    const bookId = Number(req.params.id)
    const foundBook = data.find(book => book.id === bookId)
    if (!foundBook) {
        return res.status(404).json({"error": "A book the provided ID does not exist"})
    }
    return foundBook
}

const deleteBook = (book, data) => {
    bookIndex = data.indexOf(book)
    data.splice(bookIndex, 1)
}

module.exports = { getNewBookDetails, createBook, formatBook, findBook, deleteBook }