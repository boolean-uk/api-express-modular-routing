// Import data here...
const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const films = data.films;



// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ films : films });
});


module.exports = router;
