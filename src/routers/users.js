const express = require("express");
const router = express.Router();
const { users } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }
  res.json({ user });
});

router.post("/", (req, res, err) => {
  if (!req.body.email) {
    res.status(400).json({ error: "Missing fields in request body" });
  }

  const email = req.body.email;
  const userEmail = users.find((user) => user.email === email);
  if (userEmail) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  let userId = users.length;
  userId++;
  const user = { ...req.body, id: userId };

  users.push(user);

  res.status(201).json({ user: user });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => id === user.id);
  if (!user) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }
  users.splice(users.indexOf(user), 1);
  res.status(201).json({ user });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!req.body.email) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  if (!user) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  const email = req.body.email;
  const userEmail = users.find((user) => user.email === email);
  if (userEmail) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  Object.keys(req.body).forEach((prop) => {
    user[prop] = req.body[prop];
  });
  res.status(201).json({ user });
});

module.exports = router;
