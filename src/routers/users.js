const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const currentUserId = 4;
const users = data.users;
router.get("/", (req, res) => {
  res.status(200).json({ users: users });
});
router.post("/", (req, res) => {
  const { email } = req.body;
  const newUser = {
    id: currentUserId,
    email,
  };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});
module.exports = router;
