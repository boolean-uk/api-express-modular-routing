const express = require("express");
const router = express.Router();

const users = [
    {
      id: 1,
      email: "edward@mail.com"
    },
    {
      id: 2,
      email: "nathan@mail.com"
    },
    {
      id: 3,
      email: "mike@mail.com"
    }
  ];

// Import data here...
//const books = require("../../data/index.js");


  
// Write routes here...
router.get("/", (req, res) => {
    // 1. send back a response with all contacts
    res.json(users)
  })


  module.exports = router;