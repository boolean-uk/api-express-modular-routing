const express = require("express");
const router = express.Router();
const { users } = require("../../data/index.js");

// retrieve a list of all users
router.get("/", (req, res) => {
  res.json({ users: users });
});

// create a user and add it to the others
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

  // ensure response for when duplicate users are attempted to be used
  const alreadyExists = users.find((user) => user.email === req.body.email);

  if (alreadyExists) {
    res.status(409).send("A user with the provided email already exists");
    return;
  }
  // create a new user
  const newUser = { ...req.body, id };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

// retrieve a user by id, and if they dont exist return a message stating so
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).send("A user with the provided ID does not exist");
  }

  res.json({ user: user });
});

// delete a user by their id, and if the id is not present return a message
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).send("A user with the provided ID does not exist");
  }

  users.splice(users.indexOf(user), 1);
  res.status(201).json({ user: user });
});

// update a user by their id, and if that id is not present, return a message.
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).send("A user with the provided ID does not exist");
  }

  if (!req.body.email) {
    res.status(400).send("Missing fields in request body");
    return;
  }
  // if user already exists return a message saying so
  const alreadyExists = users.find((user) => user.email === req.body.email);

  if (alreadyExists) {
    res.status(409).send("A user with the provided email already exists");
    return;
  }

  user.email = req.body.email;
  res.status(201).json({ user: user });
});

module.exports = router;
