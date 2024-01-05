const { users } = require('../../data/index')

let userId = 0

const initUserId = () => {
  users.forEach((user) => {
    if (user.id > userId) {
      userId = user.id
    }
  })
}

initUserId()

const getNewUserId = () => ++userId

const duplicate = (email) => !!users.find((user) => user.email === email)
const findUserById = (id) => users.find((user) => user.id === id)
const findUserIndexById = (id) => users.find((user) => user.id === id)

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

  if (duplicate(email)) {
    res.status(409).json({ "error": "A user with the provided email already exists" })
  }

  const user = new User(email)
  if (user) {
    users.push(user)
    res.status(201).json({ user })
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const user = findUserById(Number(id))

  if (user) {
    res.json({ user })
  } else {
    res.status(404).json({ "error": "A user with the provided ID does not exist" })
  }
})

router.put('/:id', (req, res) => {
  const  { id } = req.params
  let user = findUserById(Number(id))

  if (!user) {
    res.status(404).json({ "error": "A user with the provided ID does not exist" })
  }

  const { email } = req.body

  if (!email) {
    res.status(400).json({ "error": "Missing fields in the request body" })
  }

  if (duplicate(email)) {
    res.status(409).json({ "error": "A user with the provided email already exists" })
  }

  if (user) {
    user = { ...user, email }
    res.json( { user })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const user = findUserById(Number(id))
  const index = findUserIndexById(Number(id))

  if (user) {
    users.splice(index, 1)
    res.json({ user })
  } else {
    res.status(404).json({ "error": "A user with the provided ID does not exist" })
  }
})

module.exports = router