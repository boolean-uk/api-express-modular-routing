const express = require('express')
const router = express.Router()

const books = [
    {
      id: 1,
      title: "1984",
      type: "fiction",
      author: "George Orwell",
      pages: 5
    },
    {
      id: 2,
      title: "Life of Pi",
      type: "fiction",
      author: "Yann Martel",
      pages: 4
    },
    {
      id: 3,
      title: "How to Win Friends and Influence People",
      type: "non-fiction",
      author: "Dale Carnegie",
      pages: 3
    },
    {
      id: 4,
      title: "The Lean Startup",
      type: "non-fiction",
      author: "Eric Reis",
      pages: 2
    }
  ];

  let id = 5
  const findById = (id) => {
    return books.find((book) => book.id === id)
  }

  router.get('/', (req, res) => {
    res.send({ books })
  })
  
  router.post('/', (req, res) => {
    const body = req.body
    const titleFinder = books.find(book => book.title === body.title)
    if(!Object.keys(body)[0]){
        res.status(400).send({error: "Missing fields in request body"})
      }
      else if (titleFinder){
        res.status(409).send({error: "A book with the provided title already exists"})
      }
      else{
        body.id = id++
        books.push(body)
        res.status(201).send({ book: body })
    }
  })
  
  router.get('/:id', (req, res) => {
    const idNum = Number(req.params.id)
    const book = findById(idNum)
    if(!book){
      res.status(404).send({error: "A book the provided ID does not exist"})
    }else res.send({ book })
  })
  
  router.delete('/:id', (req, res) => {
    const idNum = Number(req.params.id)
    const bookIndex = books.findIndex((book) => book.id === idNum)
    const book = findById(idNum)
    if(!book){
      res.status(404).send({error: "A book the provided ID does not exist"})
    }else {
        books.splice(bookIndex, 1)
        res.send({ book })
    }
  })
  
  router.put('/:id', (req, res) => {
    const idNum = Number(req.params.id)
    const body = req.body
    const bookIndex = books.findIndex((book) => book.id === idNum)
    const book = findById(idNum)
    const titleFinder = books.find(book => book.title === body.title)
    if(!Object.keys(body)[0]){
      res.status(400).send({error: "Missing fields in request body"})
    } else if (!book){
      res.status(404).send({error: "A book the provided ID does not exist"})
    }else if (titleFinder){
      res.status(409).send({error: "A book with the provided title already exists"})
    }else {
        books[bookIndex] = body
        books[bookIndex].id = book.id
        res.send({ book: books[bookIndex] })
    }
  })
module.exports = router