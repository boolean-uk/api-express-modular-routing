const { users } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

let userCounter = 3

router.get('/', (req, res) => {
    return res.status(200).json({ users: users })
})

router.post('/', (req, res) => {
    let newUser = req.body
    newUser = {id: ++userCounter, ...newUser}
    users.push(newUser)



    return res.status(201).json({user: newUser})
})









module.exports = router