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
