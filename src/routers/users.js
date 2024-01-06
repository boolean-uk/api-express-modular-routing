const express = require('express')
const router = express.Router()
const { users } = require('../../data/index')

// Global variables
let userId = users.length + 1

// Retrieve a list of users
router.get('/', (req, res, next) => {
  res.status(200).json({
    users: users
  })
})

// Create a user
router.post('/', (req, res, next) => {
  const createdUser = {
    id: userId++,
    email: req.body.email
  }

  users.push(createdUser)

  res.status(201).json({ user: createdUser })
})

// Get a user by ID
router.get('/:id', (req, res, next) => {
  const foundUser = users.find((user) => user.id === Number(req.params.id))

  res.status(200).json({
    user: foundUser
  })
})

module.exports = router
