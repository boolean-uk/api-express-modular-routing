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
    const id = req.params.id
    // Loop through the array, returns if the condition in the function evaluates to true

    const user = users.find((item) => item.id === Number(id))
    
    if(!user) {
        res.status(404).json({error: "A user with the provided id doesn't exist"})
    }
    
    res.json({user})
    
})

// DELETE by id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const user = users.find((item) => item.id === Number(id))
    users.splice(users.indexOf(user), 1)

    if(!user) {
        res.status(404).json({error: "A user with the provided id doesn't exist"})
    }

    res.json({user})

})


// PUT by id
router.put('/:id', (req, res) => {
    if(req.body.email === undefined){
        res.status(400).json({error: "Missing fields in the request body"})
        return
    }

    const id = req.params.id
    const user = users.find((item) => item.id === Number(id))
    if(!user) {
        res.status(404).json({error: "A user with the provided id doesn't exist"})
        return
    }

   let duplicate
   users.forEach((obj) => {
    if(obj.email === req.body.email){
        res.status(409).json({error: "A user with the provided email already exists"})
        duplicate = true
    }
   })
   if(duplicate) {
    return
    }

    
    const updatedUser = user
    updatedUser.email = req.body.email
    users.splice(users.indexOf(user), 1, updatedUser)

    res.json({user: updatedUser})
})



module.exports = router