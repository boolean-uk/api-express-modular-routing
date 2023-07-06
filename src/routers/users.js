const express = require('express')
const router = express.Router()
const data = require('../../data/index.js')
const users = require('../../data/index.js').users

// GET all users
router.get('/', (req, res) => {
  res.status(200).json({ users })
})

// POST a new user
router.post('/', (req, res) => {
  if (req.body.email === undefined) {
    res.status(400).json({ error: 'Missing fields in the request body'})
  } else if (users.find((user) => user.email === req.body.email)) {
    res.status(409).json({ error: 'A user with the provided email already exists'})
  } else {
    let id = users[users.length - 1].id + 1
    const newUser = { ...req.body, id }
    users.push(newUser)
    res.status(201).json({ user: newUser })
  }
})

// GET a user by ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const userFound = users.find((user) => user.id === id)
  if (userFound) {
    res.status(200).json({ user: userFound })
  } else {
    res.status(404).json({ error: 'A user with the provided ID does not exist'})
  }
})

// DELETE a user by ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1)[0]
    res.status(200).json({ user: deletedUser })
  } else {
    res.status(404).json({ error: 'A user with the provided ID does not exist'})
  }
})

// PUT update a user by ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedUser = { ...req.body, id }
  const userIndex = users.findIndex((user) => user.id === id)
  
 if (req.body.email === undefined) {
  res.status(400).json({ error: 'Missing fields in the request body' })
 } else if (users.findIndex((user) => user.email === req.body.email) !== -1) {
  res.status(409).json({ error: 'A user with the provided email already exists' })
 } else if (userIndex === -1) {
  res.status(404).json({ error: 'A user with the provided ID does not exist' })
 } else {
  users[userIndex] = updatedUser
  res.status(200).json({ user: updatedUser })
 }
})

module.exports = router;