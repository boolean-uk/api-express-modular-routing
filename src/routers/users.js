const express = require("express");
const router = express.Router();

const { users } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  let id;
  if (users.length === 0) {
    id = 1;
  } else {
    id = users[users.length - 1].id + 1;
  }

  const newUser = { ...req.body, id };
  users.push(newUser);
  res.status(201).json({ newUser });
});

module.exports = router;
