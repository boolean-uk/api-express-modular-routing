// For the data, import the module from the file
const { books } = require("../../data");

// This enables the use of express router
const router = require("express").Router();

// const { check, validationResult } = require("express-validator");

// ROUTES

router.get("/", (req, res) => {
  res.json({ books });
});

router.get("/:id", (req, res) => {
  const book = findBook(req.params.id);
  if (book) {
    res.json({ book });
  } else {
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }
});

router.post("/", (req, res) => {
  const newId = books[books.length - 1].id + 1;
  const newBook = { id: newId, ...req.body };

  if (doesTitleAlreadyExist(req.body.title) === true) {
    res.status(409).json({
      error: "A book with the provided title already exists",
    });
  } else if (bookHasAllFields(newBook) === false) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else {
    books.push(newBook);
    res.status(201).json({ book: newBook });
  }
});

router.put("/:id", (req, res) => {
  const book = findBook(req.params.id);

  if (!book) {
    // If the BOOK does not already exist
    res.status(404).json({ error: "A book the provided ID does not exist" });
  }

  const updatedBook = { id: book.id, ...req.body };
  if (doesTitleAlreadyExist(req.body.title) === true) {
    // If the title already exists
    res.status(409).json({
      error: "A book with the provided title already exists",
    });
  } else if (bookHasAllFields(updatedBook) === false) {
    // If some fields are missing
    res.status(400).json({ error: "Missing fields in request body" });
  } else {
    books[books.indexOf(book)] = updatedBook;
    res.json({ book: updatedBook });
  }
});

router.delete("/:id", (req, res) => {
  const book = findBook(req.params.id);
  books.splice(books.indexOf(book), 1);
  res.json({ book });
});

function findBook(id) {
  return books.find((book) => book.id == id);
}

function doesTitleAlreadyExist(title) {
  let isTrue = false;
  books.forEach((book) => {
    if (book.title === title) {
      console.log("inside the condition");
      isTrue = true;
    }
  });
  return isTrue;
}

function bookHasAllFields(book) {
  let isTrue = true;
  if (
    !book.hasOwnProperty("id") ||
    !book.hasOwnProperty("title") ||
    !book.hasOwnProperty("type") ||
    !book.hasOwnProperty("author") ||
    !book.hasOwnProperty("pages")
  ) {
    isTrue = false;
  }
  return isTrue;
}

module.exports = router;
