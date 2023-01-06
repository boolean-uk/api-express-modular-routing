const express = require("express");
const router = express.Router();

const { films } = require("../../data/index.js");

// get all films
router.get("/", (req, res) => {
  res.json(films);
});

// create films
router.post("/", (req, res) => {
  let id;
  if (films.length === 0) {
    id = 1;
  } else {
    id = films[films.length - 1].id + 1;
    console.log("hi", films.length);

  }
  res.json(films)
});
module.exports = router;
