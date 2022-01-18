const express = require("express");

const router = express.Router();

const users = [
  {
    id: 1,
    email: "rico@mail.com"
  },
  {
    id: 2,
    email: "nathan@mail.com"
  },
  {
    id: 3,
    email: "mike@mail.com"
  }
];

router.get("/", (req, res) => {
  //console.log("here");
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  res.json({ user });
});

router.post("/", (req, res) => {
  const userToCreate = {
    ...req.body
  };

  userToCreate.id = users.length + 1;

  const updatedUsers = [...users, userToCreate];

  console.log("Check updatedUsers: ", updatedUsers);

  res.json({ user: userToCreate });
});

module.exports = router;
