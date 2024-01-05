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

module.exports = { getNewBookDetails, createBook, formatBook }