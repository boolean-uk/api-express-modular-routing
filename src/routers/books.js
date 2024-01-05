const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { books: bookData } = require("../../data/index.js");
let nextId = findNextId(bookData);

router.get("/", (req, res) => {
  return res.json({ books: bookData });
});

router.get("/:id", (req, res) => {
  const foundBook = findById(bookData, req);

  return res.json({ book: foundBook });
});

router.post("/", (req, res) => {
  const { title, type, author } = req.body;
  const newBook = { id: nextId++, title, type, author };
  
  bookData.push();
  return res.status(201).json({ book: newBook });
});

router.delete("/:id", (req, res) => {
  const foundBook = findById(bookData, req);

  bookData.splice(bookData.indexOf(foundBook), 1);
  return res.json({ book: foundBook });
});

module.exports = router;
