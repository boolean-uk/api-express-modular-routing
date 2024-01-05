const express = require('express')
const router = express.Router()

const data = require('../../data/index.js')

const findUser = (req, res) => {
    const userId = Number(req.params.id)

    const findUser = data.users.find(user => user.id === userId)

    if (!findUser) {
        res.status(404).json({message: `no such user with id: ${userId}`})
    }

    return findUser
}

router.get('/', (re, res) => {
    return res.status(200).json({users: data.users})
})

router.get('/:id', (req, res) => {
    const user = findUser(req, res)

    return res.status(200).json({user})
})


 
module.exports = router