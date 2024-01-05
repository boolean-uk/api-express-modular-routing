const express = require("express");
const router = express.Router();

const { findNextId } = require("../utilities.js");

const { users: userData } = require("../../data/index.js");
let nextId = findNextId(userData);

router.get("/", (req, res) => {
  return res.json({ users: userData });
});

router.post("/", (req, res) => {
  const { email } = req.body;
  const newUser = { id: nextId++, email };

  userData.push(newUser);
  res.status(201).json({ user: newUser });
});

module.exports = router;
