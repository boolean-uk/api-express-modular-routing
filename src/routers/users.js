const express = require('express')
const router = express.Router()

const data = require ('../../data/index.js')
const users = data.users


function findUserById(req, res) {
    const userId = Number(req.params.id)
    const foundUser = users.find((user) => user.id === userId )
 

    if (!foundUser) {
        res
          .status(404)
          .json({ message: `User with the ID ${userId} does not exist!` });
      }
    return foundUser
}

router.get('/', (req, res) => {
     res.status(200).json({users: users})
})

router.get('/:id', (req, res) => {
    const foundUser = findUserById(req,res)
    res.status(200).json({user: foundUser})
})

router.post('/', (req, res) => {
    const body = req.body

    const newUser = {
        id: users.length + 1,
        email: body.email,
    }
    users.push(newUser)
    res.status(201).json({user: newUser})
})

router.put('/:id', (req,res) => {
    const foundUser = findUserById(req,res)
    foundUser.email = req.body.email

    res.status(200).json({user: foundUser})
})

router.delete('/:id', (req, res) => {
    const foundUser = findUserById(req, res)

    users.splice(users.indexOf(foundUser), 1)

    res.status(200).json({user: foundUser})
})



module.exports = router



