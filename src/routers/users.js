const express = require("express");
const router = express.Router();
const { users } = require("../../data");
const {
  checkForMissingFields,
  checkForExistingEntry,
  findById,
} = require("../../src/utils/utils");

// GET

router.get("", (req, res) => {
  // Gets all users
  res.json({ users });
});

router.get("/:id", (req, res) => {
  res.json({ user: findById(users, Number(req.params.id)) });
});

// POST

router.post("", (req, res) => {
  checkForMissingFields(users, req.body);
  checkForExistingEntry(users, req.body);
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

// DELETE

router.delete("/:id", (req, res) => {
  const foundUser = findById(users, Number(req.params.id));
  const indexOfFoundUser = users.indexOf(foundUser);
  users.splice(indexOfFoundUser, 1);
  res.json({ user: foundUser });
});

// PUT

router.put("/:id", (req, res) => {
  const foundUser = findById(users, Number(req.params.id));
  checkForExistingEntry(users, req.body);
  const indexOfFoundUser = users.indexOf(foundUser);
  const updatedUser = req.body;
  users[indexOfFoundUser] = { ...foundUser, ...updatedUser };
  res.json({ user: users[indexOfFoundUser] });
});

module.exports = router;
