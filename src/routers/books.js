const express = require('express')
const router = express.Router()

const books = [
  {
    "id": 1,
    "title": "1984",
    "type": "Dystopian Fiction",
    "author": "George Orwell"
  },
  {
    "id": 2,
    "title": "The tale of ice and fire" ,
    "type": "Heroic Fantasy",
    "author": "George RR Martin"
  },
  {
    "id": 3,
    "title": "Men who hate women",
    "type": "Thriller",
    "author": "Stieg Larsson"
  },
  {
    "id": 4,
    "title": "The Masque of the Red Death",
    "type": "Gothic Horror",
    "author": "Edgar Allan Poe"
  }
]

let id = books.length + 1

router.get('/', (req, res) => {
  res.json({books})
})

router.post('/', (req, res) => {
  const { title, type, author } = req.body

  if (title === undefined || type === undefined || author === undefined) {
    res.status(400).json({error: "Missing fields in request body"})
  }

  let duplicate
  books.forEach(book => {
    if (book.title === title) {
      res.status(409).json({error: "A book with the provided title already exists"})
      duplicate = true
    }
  })

  if(duplicate) {
    return
  }

  const book = {
    id: id++,
    title,
    type,
    author
  }

  books.push(book)
  res.status(201).json(book)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  let book
  books.forEach(currentBook => {
    if (currentBook.id === Number(id)) {
      book = currentBook
    }
  })

  if(!book) {
    res.status(404).json({error: "A book with the provided ID does not exist"})
    return
  }

  res.json(book)
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  let book
  books.forEach(currentBook => {
    if (currentBook.id === Number(id)) {
      book = currentBook
    }
  })

  if(!book) {
    res.status(404).json({error: "A book with the provided ID does not exist"})
    return
  }
  books.splice(books.indexOf(book), 1)
  res.json(book)
})

router.put('/:id', (req, res) => {
  const { title, type, author } = req.body

  if (title === undefined || type === undefined || author === undefined) {
    res.status(400).json({error: "Missing fields in request body"})
  }

  const id = req.params.id
  let book

  let duplicate
  books.forEach(currentBook => {
    if (currentBook.title === title) {
      duplicate = true
    }
    if (currentBook.id === Number(id)) {
      book = currentBook
    }
  })

  if(!book) {
    res.status(404).json({error: "A book with the provided ID does not exist"})
    return
  }

  if(duplicate) {
    res.status(409).json({error: "A book with the provided title already exists"})
    return
  }

  books.splice(books.indexOf(book), 1, {...book, title, type, author})
  res.json({...book, title, type, author})
})

router.patch('/:id', (req, res) => {
  const { title, type, author } = req.body || false

  const id = req.params.id
  let book

  let duplicate
  books.forEach(currentBook => {
    if (title && currentBook.title === title) {
      duplicate = true
    }
    if (currentBook.id === Number(id)) {
      book = currentBook
    }
  })

  if(!book) {
    res.status(404).json({error: "A book with the provided ID does not exist"})
    return
  }

  if(duplicate) {
    res.status(409).json({error: "A book with the provided title already exists"})
    return
  }

  books.splice(books.indexOf(book), 1, {...book, title, type, author})
  res.json({
    ...book,
    title: title || book.title,
    type: type || book.type,
    author: author || book.author
  })
})
module.exports = router
