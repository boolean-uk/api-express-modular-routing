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
  res.json({ user: user });
});
//create a user
router.post("/", (req, res) => {
  const user = { ...req.body, id: users.length + 1 };
  users.push(user);
  res.status(201).json({ user: user });
});
//delete a user
router.delete("/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.status(201).json({ user: user });
});
// update a user
router.put("/:id", (req, res) => {
  const user = users.find((item) => item.id === Number(req.params.id));
  Object.keys(req.body).forEach((prop) => (user[prop] = req.body[prop]));
  res.status(201).json({ user: user });
});
module.exports = router;
