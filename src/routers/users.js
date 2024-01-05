// users.js

const express = require("express");
const router = express.Router();
const { users } = require("../../data/index");

// Define routes for /users here
router.get("/", (req, res) => {
  // Send the array of users as a response
  res.json({ users: users });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  res.json({ user: user });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  users[userIndex] = { ...users[userIndex], ...req.body, id: id };
  res.json({ user: users[userIndex] });
});

module.exports = router;
