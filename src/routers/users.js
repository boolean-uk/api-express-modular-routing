const express = require('express')
const router = express.Router()

let id = 4 

const users = [
    {
        id: 1,
        email: "edward@mail.com"
    },
    {
        id: 2,
        email: "milanosushi@hotmail.it"
    },
    {
        id: 3,
        email: "carlocùdegà@charles101.com"
    }
]

// GET all users
router.get('/', (req, res) => {
    res.json({users: users})
})

// POST a user
router.post('/', (req, res) => {
    const data = req.body
    const user = {id: id++, ...data}

    console.log(user, user.email)
    const findExisting = users.filter((obj) => {
        return obj.email === user.email
    })
    if (user.email === undefined) {
        res.status(400).json({error: "Missing fields in request body"})
    }
    if(findExisting.length !== 0){
        res.status(409).json({error: "A user with the provided email already exists"})
    }
    users.push(user)
    res.status(201).json({user: user})

})

// GET by id
router.get('/:id', (req, res) => {

})



module.exports = router