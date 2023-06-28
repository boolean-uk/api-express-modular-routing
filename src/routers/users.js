const express = require("express");
const router = express.Router();
const { users } = require("../../data/index.js");

let id = 4;
const findUserById = (id) => {
  return users.find((user) => user.id === id);
};

// 1. Retrieve a list of users
router.get("/", (req, res) => {
  res.json({ users: users });
});

// 2. Create a user
router.post("/", (req, res) => {
  const body = req.body;
  const foundEmail = users.find((user) => user.email === body.email);
  console.log(Object.keys(body)[0]);
  console.log(Object.keys(body));
  console.log(body);

  if (!Object.keys(body)[0]) {
    res.status(400).send({ error: "Missing fields in request body" });
  } else if (foundEmail) {
    res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  } else {
    body.id = id++;
    users.push(body);
    res.status(201).json({ user: body });
  }
});

router.get("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = findUserById(userId);
  if (!user) {
    res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  } else res.json({ user: user });
});

router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  const user = findUserById(userId);
  if (!user) {
    res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  } else {
    users.splice(userIndex, 1);
    res.json({ user: user });
  }
});

router.put("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const body = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  const user = findUserById(userId);
  const foundEmail = users.find((user) => user.email === body.email);
  if (!Object.keys(body)[0]) {
    res.status(400).send({ error: "Missing fields in request body" });
  } else if (!user) {
    res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  } else if (foundEmail) {
    res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  } else {
    users[userIndex] = body;
    users[userIndex].id = user.id;
    res.send({ user: users[userIndex] });
  }
});

module.exports = router;
