const express = require("express");
const router = express.Router();
const { users } = require("../../data/index");

router.get("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  const user = users.splice(userIndex, 1)[0];
  res.json({ user });
});

module.exports = router;
