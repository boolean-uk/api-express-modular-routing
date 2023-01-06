const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const users = data.users;
//get all users
router.get("/", (req, res) => {
  res.json({ users: users });
});
//get user by id
router.get("/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));

  if (!user) {
    return res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }
  res.json({ user: user });
});
//create a user
router.post("/", (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  const exists = users.find((item) => item.email === req.body.email);
  if (exists) {
    return res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }
  const user = { ...req.body, id: users.length + 1 };

  users.push(user);
  res.status(201).json({ user: user });
});
//delete a user
router.delete("/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));
  if (!user) {
    return res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(201).json({ user: user });
});
// update a user
router.put("/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));
  if (!user) {
    return res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }
  const exists = users.find((item) => item.email === req.body.email);
  if (exists) {
    return res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }
  Object.keys(req.body).forEach((prop) => (user[prop] = req.body[prop]));
  res.status(201).json({ user: user });
});
module.exports = router;
