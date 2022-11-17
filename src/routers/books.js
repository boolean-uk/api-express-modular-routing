// Import data here...
const express = require("express");
const { books } = require("../../data.js");
const booksRouter = express.Router();
class WrongBodyError extends Error {
  statusCode = 400;
}
class NotFoundError extends Error {
  statusCode = 404;
}
class BookAlreadyExistError extends Error {
  statusCode = 409;
}
// Write routes here...

booksRouter.get("/", (req, res) => {
  res.json({ books });
});

booksRouter.post("/", (req, res) => {
  if (!req.body.title) {
    throw new WrongBodyError("Missing fields in request body");
  }
  const bookAlreadyExist = books.find((u) => u.title === req.body.title);
  if (bookAlreadyExist) {
    throw new BookAlreadyExistError(
      "A book with the provideed title already exists"
    );
  }
  const book = {
    title: req.body.title,
    type: req.body.type,
    author: req.body.author,
    id: books.length + 1,
  };
  books.push(book);
  res.json({ book: book });
});

booksRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((u) => u.id === Number(id));
  if (!book) {
    throw new NotFoundError(`A book with the provided ID does not exist.`);
  }
  res.json({ book: book });
});

booksRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === Number(id));
  if (!book) {
    throw new NotFoundError(`A book with the provided ID does not exist.`);
  }
  res.json({ book: book });
  books.splice(books.indexOf(book), 1);
});

booksRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const bookAlreadyExist = books.find((u) => u.title === req.body.title);
  if (bookAlreadyExist) {
    throw new BookAlreadyExistError(
      "A book with the provideed title already exists"
    );
  }
  const newBooks = books.map((element) => {
    if (element.id === Number(id)) {
      element = {
        ...element,
        title: req.body.title,
        type: req.body.type,
        author: req.body.author,
      };
    }
    return element;
  });
  let book = newBooks.find((item) => item.id === Number(id));
  if (!book) {
    throw new NotFoundError(`A book with the provided ID does not exist.`);
  }
  res.json({ book: book });
});

booksRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const bookAlreadyExist = books.find((u) => u.title === req.body.title);
  if (bookAlreadyExist) {
    throw new BookAlreadyExistError(
      "A book with the provideed title already exists"
    );
  }
  const newBooks = books.map((element) => {
    if (element.id === Number(id)) {
      element = { id: element.id, ...req.body };
    }
    return element;
  });
  let book = newBooks.find((item) => item.id === Number(id));
  if (!book) {
    throw new NotFoundError(`A book with the provided ID does not exist.`);
  }
  res.json({ book: book });
});



module.exports = booksRouter;
