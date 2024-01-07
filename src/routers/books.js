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
    const user = findUser(req, res);
    if (user) {
      res.status(200).json({ user: user });
    }
  });
  router.delete("/:id",(req, res) => {
      const user = findUser(req, res)
  
    if (user) {
      const userIndex = users.indexOf(user)
      const deletedUser = users[userIndex];
      users.splice(userIndex, 1)
    
      return res.status(200).json({ user: deletedUser, message: 'Successfully deleted user' });
    }
  })
  router.put('/:id', (req, res) => {
      const user = findUser(req, res)
    
      if (user) {
        const { email } = req.body
        user.email = email
        
      
        return res.json({user: user})
      }
    })
// Write routes here...
