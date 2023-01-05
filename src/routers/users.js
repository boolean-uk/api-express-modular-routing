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

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  res.json({ user });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);
  users.splice(users.indexOf(user), 1);
  res.json({ user });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);
  user.email = req.body.email;
  res.json({ user });
});

module.exports = router;
