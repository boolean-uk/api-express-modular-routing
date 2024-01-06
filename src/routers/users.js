const express = require('express')
const router = express.Router()
const { users } = require('../../data/index')

// Global variables
let userId = users.length + 1

// Global functions
const findUserById = (id) => {
  const foundUser = users.find((user) => user.id === Number(id))

  return foundUser
}

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
  const foundUser = findUserById(req.params.id)

  res.status(200).json({
    user: foundUser
  })
})

// Delete a user by ID
router.delete('/:id', (req, res, next) => {
  const foundUser = findUserById(req.params.id)

  users.splice(
    users.findIndex((user) => user.id === foundUser.id),
    1
  )

  res.status(200).json({ user: foundUser })
})

// Update a user by ID
router.put('/:id', (req, res, next) => {
  const foundUser = findUserById(req.params.id)

  foundUser.email = req.body.email

  res.status(200).json({ user: foundUser })
})

module.exports = router
