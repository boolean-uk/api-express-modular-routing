const { users } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

const findUser = (id) => {
    return users.find(user => user.id === parseInt(id))
}

router.get('/', (req, res) => {
    res.json({ users })
})
