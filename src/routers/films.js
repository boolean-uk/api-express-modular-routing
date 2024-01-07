// Import data here...
const express = require("express");
const { films } = require("../../data/index");
const router = express.Router();

// Get request for all films
router.get("/", (req, res) => {
  res.status(200).json({ films });
});
