const express = require('express');
const { users } = require('../../data/index');

const router = express.Router();
let id = getRandomId();

// Retrieve a list of users
router.get('/', (req, res) => {
  res.json({ users });
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = { id: id++, ...req.body };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

// Get a user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).end();
  }
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const removedUser = users.splice(userIndex, 1);
    res.json({ user: removedUser[0] });
  } else {
    res.status(404).end();
  }
});

// Update a user by ID
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const updatedUser = { id: userId, ...req.body };
    users[userIndex] = updatedUser;
    res.json({ user: updatedUser });
  } else {
    res.status(404).end();
  }
});

// Generate a random ID
function getRandomId() {
  return Math.floor(Math.random() * 1000) + 1;
}

module.exports = router;
