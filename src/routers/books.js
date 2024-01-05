const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { books: bookData } = require("../../data/index.js");
let nextId = findNextId(bookData);

router.get("/", (req, res) => {
  return res.json({ books: bookData });
});

module.exports = router