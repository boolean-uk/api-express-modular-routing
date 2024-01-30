const express = require("express");
const router = express.Router();

const data = require("../../data/index.js");
const users = data.users;

const findUser = (userId) => {
  return users.find((user) => user.id === userId);
};

router.get("/", (req, res) => {
  res.status(200).json({ users });
});

router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const selectedUser = findUser(userId);

  if (!selectedUser) {
    return res
      .status(404)
      .json({ message: `User with the ID ${userId} does not exist!` });
  }

  res.status(200).json({ user: selectedUser });
});

router.post("/", (req, res) => {
  const { email } = req.body;

  const newUser = {
    id: users.length + 1,
    email,
  };

  users.push(newUser);
  res.status(201).json({ user: newUser });
});

router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const selectedUser = findUser(userId);

  if (!selectedUser) {
    return res
      .status(404)
      .json({ message: `User with the ID ${userId} does not exist!` });
  }

  users.splice(users.indexOf(selectedUser), 1);
  res.status(200).json({ user: selectedUser });
});

router.put("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const selectedUser = findUser(userId);

  if (!selectedUser) {
    return res
      .status(404)
      .json({ message: `User with the ID ${userId} does not exist!` });
  }

  selectedUser.email = req.body.email;
  res.status(200).json({ user: selectedUser });
});

module.exports = router;
