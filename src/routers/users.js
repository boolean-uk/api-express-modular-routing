const { users } = require('../../data/index.js')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.status(200).json({ users: users })
})









module.exports = router