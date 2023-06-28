const express = require("express");
const { books } = require("../../data/index.js");
const booksRouter = express.Router();
let idNum = books.length;

const findBookByID = (id) => {
  const res = books.find((book) => {
    return book.id === Number(id);
  });
  return res;
};

// 1 - GET - Retrieve a list of books
booksRouter.get("/", (req, res) => {
  return res.send({ books });
});

// 2 - POST - Create a book
booksRouter.post("/", (req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const author = req.body.author
  const pages = req.body.pages

  idNum++;

  const book = {
    id: Number(idNum),
    title: title,
    type: type,
    author: author,
    pages: pages
  };
  books.push(book);
  return res.status(201).send({ book });
});

// 3 - Get a book by ID
booksRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = findBookByID(Number(id));

  if (book) {
    return res.send({ book });
  } else {
    return res.status(404).send("A book with the provided ID does not exist");
  }
});

// 4 - DEL - Delete a book by ID
booksRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const book = findBookByID(Number(id));

  const bookIdx = books.findIndex((item) => {
    return item === book;
  });

  if (book) {
    const book = books.splice(bookIdx, 1)[0];
    return res.send({ book });
  } else {
    return res.status(404).send("A book with the provided ID does not exist");
  }
});

// 5 - PUT - Update a book by ID
booksRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const book = findBookByID(Number(id));
  const title = req.body.title;
  const type = req.body.type;
  const author = req.body.author
  const pages = req.body.pages

  const bookIdx = books.findIndex((item) => {
    return item === book;
  });

  if (book) {
    books[bookIdx].title = title;
    books[bookIdx].type = type;
    books[bookIdx].author = author;
    books[bookIdx].pages = pages;


    return res.send({ book });
  } else {
    return res.status(404).send("A book with the provided ID does not exist");
  }
});

module.exports = booksRouter;



