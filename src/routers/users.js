const express = require('express');
const { users } = require('../../data/index')
const router = express.Router();

let id = 4

// GET users
router.get('/', (req, res) => {
    res.json({ users })
})

// POST Create a user
router.post('/', (req, res) => {
   const body = req.body
   const newUser = {id: id, ...body}
   users.push(newUser)
   id++

   return res.status(201).send({user: newUser})
})

// GET a user by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)

    return res.send({ user })
})

// DELETE a user by ID
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    let userIndex = -1
    const user = users.find((user, index) => {
        if (user.id === id) {
            userIndex = index
            return true
        } else {
            return false
        }
    })

    if (user) {
        users.splice(userIndex, 1)
        return res.send(user)
    } else {
        return res.status(404).send({error: "string"})
    }
})

// PUT Update a user by ID
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const body = req.body

    let updatedUser = users.find((user) => user.id === id)
    Object.assign(updatedUser, body)
    return res.send({user: updatedUser})
})

module.exports = router