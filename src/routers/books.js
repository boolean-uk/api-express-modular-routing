const express = require('express')
const router = express.Router()


const data = require('../../data/index.js')
const books = data.books


function findBookById(req, res) {
    const bookId = Number(req.params.id)
    const foundBook = books.find((book) => book.id === bookId)

    if(!foundBook) {
        res
          .status(404)
          .json({message: `Book with the ID ${bookId} does not exist!`})
    }
    return foundBook
}

router.get('/', (req, res) => {
    return res.status(200).json({books: books})
})

router.get('/:id', (req, res) => {
    const foundBook = findBookById(req, res)
    return res.status(200).json({book: foundBook})
 
})


router.post('/', (req, res) => {
    const body = req.body;
    const newBook = {
        id: books.length + 1,
        title: body.title,        
        type: body.type,
        author: body.author,
        pages: body.pages,
    };
    books.push(newBook);
    res.status(201).json({ book: newBook });
});


router.put('/:id', (req, res) => {
    const bookUpdate = findBookById(req, res);
    const body = req.body;
    bookUpdate.title = body.title;
    bookUpdate.type = body.type;
    bookUpdate.author = body.author;
    bookUpdate.pages = body.pages;
    res.status(200).json({ book: bookUpdate });
})

router.patch('/:id',(req,res) => {
    const foundBook = findBookById(req,res)
    
    foundBook.title = title ? title : foundBook.title;
    foundBook.type = type ? type : foundBook.type;
    foundBook.author = author ? author : foundBook.author;
    foundBook.pages = pages ? pages : foundBook.pages;

    return res.status(200).json({ foundBook });
})

router.delete('/:id', (req, res) => {
    const bookDelete = findBookById(req, res);
    books.splice(books.indexOf(bookDelete), 1);
    res.status(200).json({ book: bookDelete });
})



module.exports = router


