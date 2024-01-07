const express = require('express')
const router = express.Router()
const { users } = require('../../data/index')
const ErrorConstructor = require('../helpers/ErrorConstructor')
const FieldsErrorHandler = require('../helpers/FieldsErrorHandler')

// Global variables
let userId = users.length + 1

// Global functions
const findUserById = (id) => {
  const foundUser = users.find((user) => user.id === Number(id))

  if (!foundUser) {
    throw ErrorConstructor('A user with the provided ID does not exist', 404)
  }

  return foundUser
}

const emailErrorHandling = (email) => {
  const foundUser = users.find((user) => user.email === email)

  if (foundUser) {
    throw ErrorConstructor('A user with the provided email already exists', 409)
  }

  return
}

// Retrieve a list of users
router.get('/', (req, res, next) => {
  res.status(200).json({
    users: users
  })
})

// Create a user
router.post('/', (req, res, next) => {
  try {
    const { email } = req.body

    // Errors handlings
    FieldsErrorHandler([email])
    emailErrorHandling(email)

    const createdUser = {
      id: userId++,
      email: email
    }

    users.push(createdUser)

    res.status(201).json({ user: createdUser })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
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
  try {
    const { email } = req.body

    // Error handlings
    FieldsErrorHandler([email])
    emailErrorHandling(email)

    const foundUser = findUserById(req.params.id)

    foundUser.email = email

    res.status(200).json({ user: foundUser })
  } catch (error) {
    res.status(error.status).json({ error: error.message })
  }
})

module.exports = router
