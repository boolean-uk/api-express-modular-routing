const express = require("express");
const { users } = require("../../data/index");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ users });
});

// Get request for a single id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(404).json({ error: `No user found with id ${id}` });
  }
});
// Post request to create new user
router.post("/", (req, res) => {
  const newUser = {
    ...req.body,
    id: users.length + 1,
  };

  users.push(newUser);

  res.status(201).json({ user: newUser });
});
// Put request to update user
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundUser = users.find((user) => user.id === id);

  if (!foundUser) {
    return res.status(404).json({ error: `No user found with id ${id}` });
  }

  const updates = req.body;
  Object.assign(foundUser, updates);

  res.status(200).json({ user: foundUser });
});
