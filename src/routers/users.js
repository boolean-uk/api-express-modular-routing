const express = require('express')
const router = express.Router()

const users = [
  {
    id: 1,
    email: 'edward@mail.com'
  },
  {
    id: 2,
    email: 'nathan@mail.com'
  },
  {
    id: 3,
    email: 'mike@mail.com'
  }
]
let id = 4
const findById = (id) => {
  return users.find((user) => user.id === id)
}

router.get('/', (req, res) => {
  res.send({ users })
})

router.post('/', (req, res) => {
  const body = req.body
  body.id = id++
  users.push(body)
  res.status(201).send({ user: body })
})

router.get('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const user = findById(idNum)
  res.send({ user })
})

router.delete('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const userIndex = users.findIndex((user) => user.id === idNum)
  const user = findById(idNum)
  users.splice(userIndex, 1)
  res.send({ user })
})

router.put('/:id', (req, res) => {
  const idNum = Number(req.params.id)
  const body = req.body
  const userIndex = users.findIndex((user) => user.id === idNum)
  const user = findById(idNum)
  users[userIndex] = body
  users[userIndex].id = user.id
  res.send({ user: users[userIndex] })
})
module.exports = router
