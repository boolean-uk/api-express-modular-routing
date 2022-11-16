const { json } = require("express");
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
  console.log(newUser, users);
  res.status(201).json({ user: newUser });
});

// DELETE

router.delete("/:id", (req, res) => {
    
});

module.exports = router;
