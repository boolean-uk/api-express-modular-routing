const express = require("express");

const router = express.Router()

const data = require('../../data/index.js')


const users = data.users

router.get('/',(req,res)=>{

    return res.status(200).json({users})
})

router.post('/',(req,res)=>{
    
})

console.log(users)

module.exports = router;