const express = require('express')
const router = express.Router()


const data = require('../../data/index.js')
const users = data.users

let lastUsersId = users.length


router.get('/', (req, res)=>{
    res.status(200).json(users)
})

router.post('/', (req, res)=>{

    const body = req.body
    const newUser = { 
        ...body,
       id: ++lastUsersId 
    }

    users.push(newUser)

    res.status(200).json(newUser)

})

router.get('/:id', (req, res)=>{
    const userId = Number(req.params.id)
    
    const foundUser = users.find((user)=> user.id === userId)

    res.status(200).json(foundUser)

})

router.delete('/:id', (req, res)=>{
    const userId = Number(req.params.id)
    const deleteUser = users.find((user)=> user.id === userId)

    const deleteUserIndex = users.indexOf()

    users.splice(deleteUserIndex, 1)

    res.status(200).json(deleteUser)

})

router.put('/:id', (req, res)=>{

    const userId = Number(req.params.id)
    const editUser = users.find((user)=> user.id === userId)
   
    res.status(200).json(editUser)

})

module.exports = router