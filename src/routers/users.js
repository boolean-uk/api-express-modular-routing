const express = require('express')
const router = express.Router()

const { users } = require('../../data/index.js')


const findUser = (req, res) => {
    const id = req.params.id
    const foundUser = users.find((user) => user.id === Number(id))

    if(!foundUser) {
       return res.status(404).json({error: "A user with the provided ID does not exist"})
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

    const bodyValues = Object.values(req.body)

    const requiredField = ['email']
    const missingField = requiredField.filter((field) => (field in newUser))


    if(missingField.length === 0) {
        return res.status(400).json({error: "Missing fields in request body"})
    }

    if(bodyValues.some(value => !value)) {
        return res.status(400).json({ error: 'Missing fields in request body'})
    }

    const doesUserExist = users.find((user) => user.email === newUser.email)
    if(doesUserExist) {
        return res.status(409).json({ error: "A user with the provided email already exists"})
    }

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
    
    res.status(404).json({error: "A user with the provided ID does not exist"})

})


router.put('/:id', (req, res) => {
    const foundUser = findUser(req, res)
    const existingUser = users.find(user => user.email === req.body.email && user.id !== parseInt(req.params.id))

    if(existingUser) {
        return res.status(409).json({ error: "A user with the provided email already exists"})
    }
    
    if(foundUser) {
        Object.assign(foundUser, req.body)
        return res.status(200).json({user: foundUser})
    } 
})


module.exports = router