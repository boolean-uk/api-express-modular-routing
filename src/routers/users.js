const express = require('express')
const router = express.Router()

const { users } = require('../../data/index.js')


const findUser = (req, res) => {
    const id = req.params.id
    const foundUser = users.find((user) => user.id === Number(id))

    if(!foundUser) {
        res.status(404).json({error: `No such user with ID: ${id}`})
    }
    return foundUser
}


router.get('/', (req, res) => {
    return res.status(200).json({users})
})

router.post('/', (req, res) => {
    const newUser = req.body
    const id = users.length + 1
    newUser.id = id
    users.push(newUser)
    return res.status(201).json({user: newUser})
})

router.get('/:id', (req, res) => {
    const user = findUser(req, res)
    if(user) {
       return res.status(200).json({user: user})
    }
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const userToDelete = users.findIndex((user) => user.id === id)

    if(userToDelete !== -1) {
        const [deletedUser] = users.splice(userToDelete, 1)
        console.log(users)
        return res.status(200).json({user: deletedUser})
    }
    res.status(404).json({error: `No such user with ID: ${id}`})

})


router.put('/:id', (req, res) => {
    const foundUser = findUser(req, res)
    if(foundUser) {
        Object.assign(foundUser, req.body)
        return res.status(200).json({user: foundUser})
    }
})


module.exports = router