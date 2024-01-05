const getNewBookDetails = (req) => {
    const details = {
        "title": req.body.title,
        "type": req.body.type,
        "author": req.body.author
    }
    return details
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
        return res.status(404).json(`Book with ID: ${bookId} does not exist`)
    }
    return foundBook
}

const deleteBook = (book, data) => {
    bookIndex = data.indexOf(book)
    data.splice(bookIndex, 1)
}

module.exports = { getNewBookDetails, createBook, formatBook, findBook, deleteBook }