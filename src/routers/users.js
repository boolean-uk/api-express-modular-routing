const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const currentUserId = 4;
const users = data.users;

// Function to find a user by ID
const findUser = (req, res) => {
  const userId = Number(req.params.id);
  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res.status(404).json({ error: `User with ID ${userId} not found` });
  }

  return foundUser;
};

// Route to get all users
router.get("/", (req, res) => {
  res.status(200).json({ users: users });
});

// Route to add a new user
router.post("/", (req, res) => {
  const { email } = req.body;

  // Creating a new user object
  const newUser = {
    id: currentUserId,
    email,
  };


  users.push(newUser);

  res.status(201).json({ user: newUser });
});

// Route to get a user by ID
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

  return res.status(200).json({ user: deletedUser, message: 'Delete the contact' });
}
})
module.exports = router;
