const express = require('express')
const router = express.Router()
const { users } = require('../../data/index')

// Global variables
let userId = users.length + 1

// Global functions
const findUserById = (id) => {
  const foundUser = users.find((user) => user.id === Number(id))

  if (!foundUser) {
    const err = new Error('A user with the provided ID does not exist')
    err.status = 404
    throw err
  }

  return foundUser
}

const findUserByEmail = (email) => {
  const foundUser = users.find((user) => user.email === email)

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
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Missing fields in request body' })
  }

  const foundUser = findUserByEmail(email)

  if (foundUser) {
    return res
      .status(409)
      .json({ error: 'A user with the provided email already exists' })
  }

  const createdUser = {
    id: userId++,
    email: email
  }

  users.push(createdUser)

  res.status(201).json({ user: createdUser })
})

// Get a user by ID
router.get('/:id', (req, res, next) => {
  try {
    const foundUser = findUserById(req.params.id)

    res.status(200).json({
      user: foundUser
    })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Delete a user by ID
router.delete('/:id', (req, res, next) => {
  try {
    const foundUser = findUserById(req.params.id)

    users.splice(
      users.findIndex((user) => user.id === foundUser.id),
      1
    )

    res.status(200).json({ user: foundUser })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

// Update a user by ID
router.put('/:id', (req, res, next) => {
  const foundUser = findUserById(req.params.id)

  foundUser.email = req.body.email

  res.status(200).json({ user: foundUser })
})

module.exports = router
