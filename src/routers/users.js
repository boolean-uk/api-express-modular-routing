const express = require('express')
const router = express.Router()

const data = require ('../../data/index.js')
const users = data.users
const userCounter = users.length

function findUserById(req, res) {
    const userId = Number(req.params.id)
    const foundUser = users.find((user) => {user.id === userId })
}

router.get('/', (req, res) => {
    return res.status(200).json({users})
})

router.get('/:id', (req, res) => {
    const foundUser = findUserById(req,res)
    return res.status(200).json({foundUser})
})

router.post('/', (req, res) => {
    let newUser = req.body

    newUser = ({id: ++userCounter, ...newUser})
    return res.status(200).json({newUser})
})

router.put('/:id', (req,res) => {
    const updateUserInfo = req.body
    const foundUser = findUserById(req,res)

    foundUser.email = updateUserInfo.email

    return res.status(200).json({foundUser})
})

router.delete('/:id', (req, res) => {
    const foundUser = findUserById(req, res)

    const userIndex = users.indexOf()

    users.splice(userIndex, 1)

    return res.status(200).json(foundUser)
})

module.exports = router
