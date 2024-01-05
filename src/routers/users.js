const express = require('express')
const router = express.Router()

const users = require('../../data/index.js')

router.get('/', (re, res) => {
    return res.status(200).json({users: users.users})
})
 
module.exports = router