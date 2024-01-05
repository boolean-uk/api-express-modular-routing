const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { books: bookData } = require("../../data/index.js");
let nextId = findNextId(bookData);

module.exports = router