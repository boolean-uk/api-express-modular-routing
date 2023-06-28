const express = require("express");
const router = express.Router()
const { users } = require('../../data/index')

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

module.exports = router
