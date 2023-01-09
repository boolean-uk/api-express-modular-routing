const express = require("express");
const router = express.Router();

const { users } = require("../../data/index.js");

// get all user
router.get("/", (req, res) => {
  res.json({ users: users });
});

// create user
router.post("/", (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: "Missing fields in request body" });
    return;
  }

  const alreadyExists = users.find((user) => user.email === req.body.email);
  if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
    return;
  }

  const newUser = { ...req.body, id: users.length + 1 };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

// get user by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).json({ error: "A user with the provided ID does not exist" });
  }

  res.json({ user: user });
});

// delete user by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);

  if (!user) {
    res.status(404).json({ error: "A user with the provided ID does not exist" });
  }

  users.splice(users.indexOf(user), 1);
  res.status(201).json({ user: user });
//   console.log("hello",)
});
// edit user by id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((singleUser) => singleUser.id === id);
  console.log(user);
  if (!user) {
    res.status(404).json({ error: "A user with the provided ID does not exist" });
  }

  const alreadyExists = users.find((user) => user.email === req.body.email);

  if (alreadyExists) {
    res.status(409).json({ error: "A user with the provided email already exists" });
    return;
  }
  Object.keys(req.body).forEach((prop) => (user[prop] = req.body[prop]));
  res.status(201).json({ user: user });
});

module.exports = router;
