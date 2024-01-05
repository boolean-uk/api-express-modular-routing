const express = require("express");
const data = require("../../data/index");
const users = data.users;
const router = express.Router();

const id = users.length + 1;

const findUserBy = (id) => {
    const idNum = parseInt(id)
    return users.find((user) => user.id === idNum)
}

router.get("/", (req, res) => {
  return res.json({ users: users });
});

router.post("/", (req, res) => {
  const newUser = req.body;
  const { email } = newUser;
  if (!email || email.length === 0) {
    return res.status(400).json({ error: "Missing fields in request body" });
  }
  if (users.find((user) => user.email === email)) {
    return res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  newUser.id = id;
  users.push(newUser);

  return res.status(201).json({ user: newUser });
});

router.get('/:id', (req, res) => {
    const foundUser = findUserBy(req.params.id)
    return res.json({"user": foundUser} )
})

module.exports = router;
