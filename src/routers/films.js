// Importing films array from a data module
const { films } = require("../../data/index.js");

// Importing the Express framework and creating a router instance
const express = require("express");
const router = express.Router();

// Initializing a counter for assigning unique IDs to films
let filmCounter = 4;


module.exports = router;