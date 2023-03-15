const express = require("express");
const router = express.Router();
  
// Import data here...
const data = require("../../data");
const books = data.books;
 
// Write routes here...
router.get("/", (req, res) => {
    // 1. send back a response with all contacts
    res.json(books)
  })

// get by a book by id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const book = books.find(item => item.id === id)
    
    res.json(book)
  })

  // CREATE A book
router.post("/", (req, res) => {
    const book = (req.body)
    books.push(book)
    res.json(book)
})
// UPDATE A a book BY ID
router.patch("/:id", (req, res) => {
    
    const id = Number(req.params.id)
    let book = books.find(item => item.id === id)

    const updatedBook= {
        "id": id,
        "title": req.body.title,
        "type": req.body.type,
        "author": req.body.author,
        "pages": req.body.pages
   }
   let index = books.indexOf(book)
   if (index !== -1) {
    books[index]= updatedBook
  }
    res.json(updatedBook)
  })

// DELETE A BOOK BY ID
router.delete("/:id", (req, res) => {
    
    const id = Number(req.params.id)
    const book = books.find(item => item.id === id)
    let index = books.indexOf(book);
    books.splice(index, 1)
    // 4. send it back in the response
    res.json(books)
  })
  module.exports = router;