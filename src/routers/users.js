const express = require("express");
const router = express.Router();
const { users } = require("../../data/index.js");

router.get("/", (req, res) => {
  res.json({users});
});

router.post("/", (req, res) => {
  if (Object.keys(req.body).toString() !== "email")
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  const foundEmail = users.find(user => user.email === req.body.email)
  if (foundEmail !== undefined)
    return res.status(409).json({
      error: "A user with the provided email already exists"
    })
  const id = users[users.length-1].id + 1
  const user = { id: id, ...req.body };
  users.push(user);
  res.status(201).json({user});
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user === undefined)
    return res.status(404).json({
      error: "A user with the provided ID does not exist",
    });
  res.json({user});
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  const index = users.indexOf(user)
  if (user === undefined)
    return res.status(404).json({
      error: "A user with the provided ID does not exist",
    });
  users.splice(index, 1)
  res.status(201).json({user});
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const email = req.body.email;
  const user = { id: id, ...req.body };
  const userIndex = users.findIndex((user) => user.id === id);

  if (email === undefined)
    return res.status(400).json({
      error: "Missing fields in the request body",
    });

  if (userIndex === -1)
    return res.status(404).json({
      error: "A user with the provided ID does not exist",
    });

  const found = users.find((user) => user.email === email);
  if (found !== undefined)
    return res.status(409).json({
      error: "A user with the provided email already exists",
    });

  users[userIndex] = user;
  res.status(201).json({user});
});

module.exports = router;
