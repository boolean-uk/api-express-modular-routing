const express = require("express");

const router = express.Router();

const data = require("../../data/index.js");

const users = data.users;

const findUser = (req, res) => {
  const userId = Number(req.params.id);

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res
      .status(404)
      .json({ message: `user with the id ${userId} doesn't exist` });
  }
  return foundUser;
};

router.get("/", (req, res) => {
  return res.status(200).json({ users });
});

router.post("/", (req, res) => {
  const body = req.body;

  const newUser = {
    id: users.length + 1,
    email: body.email,
  };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

router.get("/:id", (req, res) => {
  const userFound = findUser(req, res);
  res.status(200).json({ userFound });
});

router.delete("/:id", (req, res) => {
  const userDelete = findUser(req, res);

  users.splice(users.indexOf(userDelete), 1);
  console.log(userDelete);
  res.status(200).json({ user: userDelete });
});
module.exports = router;
