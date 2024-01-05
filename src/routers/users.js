const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { users: userData } = require("../../data/index.js");
let nextId = findNextId(userData);

router.get("/", (req, res) => {
  return res.json({ users: userData });
});

router.get("/:id", (req, res) => {
  const foundUser = findById(userData, req);

  return res.json({ user: foundUser });
});

router.post("/", (req, res) => {
  const { email } = req.body;
  const newUser = { id: nextId++, email };

  userData.push(newUser);
  return res.status(201).json({ user: newUser });
});

router.delete("/:id", (req, res) => {
  const foundUser = findById(userData, req);

  userData.splice(userData.indexOf(foundUser), 1);
  return res.json({ user: foundUser });
});

router.put("/:id", (req, res) => {
  const foundUser = findById(userData, req);

  foundUser.email = req.body.email;
  return res.json({ user: foundUser });
});

module.exports = router;
