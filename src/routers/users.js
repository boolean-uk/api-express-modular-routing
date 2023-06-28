const express = require("express");
const router = express.Router()
let { users } = require('../../data/index')

let newId = users.length

router.get('/', (req, res) => {
  return res.send({ users })
})

router.post('/', (req, res) => {
  newId++
  const newUser = {
    ...req.body,
    id: newId
  }
  users.push(newUser)
  return res.status(201).send({user: newUser})
})

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user) => user.id === id)
  return res.send({ user: user })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const userDel = users.find((user) => user.id === id)
  if(userDel) {
    users = users.filter((user) => user.id !== id)
    return res.send({user: userDel})
  }

})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const userToUpdate = users.find((user) => user.id === id)

  if(userToUpdate) {
    userToUpdate.email = req.body.email
    return res.send({user: userToUpdate})
  }
})

module.exports = router
