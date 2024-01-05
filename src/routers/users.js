const express = require("express");
const router = express.Router();

const {findNextId} = require("../utilities.js")

const { users: userData } = require("../../data/index.js");
let nextId = findNextId(userData)

router.get("/", (req, res) => {
  return res.json({ users: userData });
});

module.exports = router;
