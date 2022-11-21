const express = require("express");
const router = express.Router();
const { users } = require('../../data')
let userId = users.length

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id === id);

  res.json({ user });
});

router.post("/", (req, res) => {
  userId++

  const user = {
    ...req.body,
    id: userId
  };

  users.push(user);

  res.status(201).json({ user: user });
});

router.put("/:id", (req, res) => {
  const userId = Number(req.params.id);
  let user = users.find(user => user.id === userId);

  user = {
    ...user,
    ...req.body
  };

  res.status(201).json({ user: user });
});

router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(user => user.id === userId);
  const index = users.indexOf(user)
  users.splice(index, 1)

  res.status(201).json({ user: user });
});

module.exports = router;
