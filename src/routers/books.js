// Import data here...
const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const currentBookId = 5;
const books = data.books;
module.exports = router;
const findBook = (req, res) => {
    const bookId = Number(req.params.id);
  
    const foundBook = books.find((book) => book.id === bookId);
  
    if (!foundBook) {
      res.status(404).json({ error: `No such post with ID: ${bookId}` });
    }
  
    return foundBook;
  };
  router.get("/", (req, res) => {
    res.status(200).json({ books: books });
  });
  router.post("/", (req, res) => {
    const { title, type, author, pages } = req.body;
    const newBook = {
      id: currentBookId,
      title,
      type,
      author,
      pages,
    };
    books.push(newBook);
    res.status(201).json({ book: newBook });
  });
  router.get("/:id", (req, res) => {
    const book = findBook(req, res);
    if (book) {
      res.status(200).json({ book: book });
    }
  });
  router.delete("/:id",(req, res) => {
      const book = findBook(req, res)
  
    if (book) {
      const bookIndex = books.indexOf(book)
      const deletedBook = books[bookIndex];
      books.splice(bookIndex, 1)
    
      return res.status(200).json({ book: deletedBook, message: 'Successfully deleted book' });
    }
  })
  router.put('/:id', (req, res) => {
      const book = findBook(req, res)
    
      if (book) {
        const {title,
            type,
            author,
            pages,} = req.body
        book.title = title
        book.type = type
        book.author = author
        book.pages= pages
        
      
        return res.json({book: book})
      }
    })
// Write routes here...
