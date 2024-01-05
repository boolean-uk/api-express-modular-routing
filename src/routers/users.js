const { users } = require('../../data/index')

let userId = 0
const getNewUserId = () => ++userId

const duplicate = (email) => !!users.find((user) => user.email === email)

class User {
  constructor(email){
    this.id = getNewUserId()
    this.email = email
  }
}

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.json({ users }))

router.post('/', (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json( { "error": "Missing fields in request body"})
  }

  if (duplicate) {
    res.status(409).json({ "error": "A user with the provded email already exists" })
  }

  const user = new User(email)
  if (user) {
    users.push(user)
    res.status(201).json({ user })
  }
})

module.exports = router