const express = require("express");
const data = require("../../data/index");
const users = data.users;
const router = express.Router();

const id = users.length + 1;

const findUserBy = (id, res) => {
  const idNum = parseInt(id);
  const foundUser = users.find((user) => user.id === idNum);
  if (!foundUser)
    return res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  return foundUser;
};

const checkIfEmailExists = (email, res) => {
  if (users.find((user) => user.email === email)) {
    return res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }
};

router.get("/", (req, res) => {
  return res.json({ users: users });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const { email } = newUser;
  if (!email || email.length === 0) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  checkIfEmailExists(email, res);

  newUser.id = id;
  users.push(newUser);

  return res.status(201).json({ user: newUser });
});

router.get("/:id", (req, res) => {
  const foundUser = findUserBy(req.params.id, res);
  return res.json({ user: foundUser });
});

router.delete("/:id", (req, res) => {
  const foundUser = findUserBy(req.params.id, res);
  const index = users.indexOf(foundUser);
  users.splice(index, 1);
  return res.json({ user: foundUser });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const foundUser = findUserBy(id, res);
  const newUser = req.body;
  const { email } = newUser;

  if (!email || email.length === 0) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  checkIfEmailExists(email, res);

  foundUser.email = newUser.email;
  return res.json({ user: foundUser });
});
module.exports = router;
