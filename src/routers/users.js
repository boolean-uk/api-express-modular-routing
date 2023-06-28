const express = require('express')
const { users } = require('../../data/index.js')
const usersRouter = express.Router()
let idNum = users.length 

// 1 - GET - Retrieve a list of users
usersRouter.get('/', (req, res) => {
  return res.send({users})
})

// 2 - POST - Create a user
usersRouter.post('/', (req, res) => {
  const email = req.body.email
  idNum++
  const user = {
    id: Number(idNum),
    email: email
  }
  users.push(user)
  return res.status(201).send({user})
})

// 3 - Get a user by ID

// 4 - DEL - Delete a user by ID

// 5 - PUT - Update a user by ID

module.exports = usersRouter