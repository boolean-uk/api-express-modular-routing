const express = require("express");
const router = express.Router();

const { users: userData } = require("../../data/index.js");

router.get("/", (req, res) => {
  return res.json({ users: userData });
});

module.exports = router;
