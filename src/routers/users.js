const express = require("express");
const router = express.Router();

const { users } = require("../../data/index.js");

// get all user
router.get("/", (req, res) => {
  res.json(users);
});

// create user
router.post("/", (req, res) => {
  let id;
  if (users.length === 0) {
    id = 1;
  } else {
    id = users[users.length - 1].id + 1;
  }

  if (!req.body.email) {
    res.status(400).send("Missing fields in request body");
    return;
  }

  const alreadyExists = users.find((user) => user.email === req.body.email);
  if (alreadyExists) {
    res.status(409).send("A user with the provided email already exists");
    return;
  }
  
  const newUser = { ...req.body, id };
  users.push(newUser);
  res.status(201).json({ newUser });
});

// get user by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).send("A user with the provided ID does not exist");
  }

  res.json({ user });
});

// delete user by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).send("A user with the provided ID does not exist");
  }

  users.splice(users.indexOf(user), 1);
  res.json({ user });
});

// edit user by id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);
  console.log(user);
  if (!user) {
    res.status(404).send("A user with the provided ID does not exist");
  }

  if (!req.body.email) {
    res.status(400).send("Missing fields in request body");
    return;
  }

  const alreadyExists = users.find((user) => user.email === req.body.email);

  if (alreadyExists) {
    res.status(409).send("A user with the provided email already exists");
    return;
  }

  user.email = req.body.email;
  res.json({ user });
});

module.exports = router;
