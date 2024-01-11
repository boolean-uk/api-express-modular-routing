const express = require("express");

const router = express.Router()

const data = require('../../data/index.js')


const users = data.users

router.get('/',(req,res)=>{

    return res.status(200).json({users})
})

router.post('/',(req,res)=>{
    const body =  req.body
    

    const newUser = {
        id: users.length + 1,
        email: body.email
    }
    console.log(newUser)
    users.push(newUser)
    res.status(201).json({user : newUser})

})


module.exports = router;