const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const currentUserId = 4;
const users = data.users;
const findUser = (req, res) => {
  const userId = Number(req.params.id);

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res.status(404).json({ error: `No such post with ID: ${userId}` });
  }

  return foundUser;
};
router.get("/", (req, res) => {
  res.status(200).json({ users: users });
});
router.post("/", (req, res) => {
  const { email } = req.body;
  const newUser = {
    id: currentUserId,
    email,
  };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});
router.get("/:id", (req, res) => {
  const user = findUser(req, res);
  if (user) {
    res.status(200).json({ user: user });
  }
});
router.delete("/:id",(req, res) => {
    const user = findUser(req, res)

  if (user) {
    const userIndex = users.indexOf(user)
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1)
  
    return res.status(200).json({ user: deletedUser, message: 'Successfully deleted contact' });
  }
})
module.exports = router;
