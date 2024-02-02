const { users } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

const findUser = (id) => {
    return users.find(user => user.id === parseInt(id))
}

router.get('/', (req, res) => {
    res.json({ users })
})

router.post('/', (req, res) => {
    const body = req.body
    const newUser = { id: users.length + 1, ...body }
    users.push(newUser)
    res.status(201).json({ user: newUser })
})
