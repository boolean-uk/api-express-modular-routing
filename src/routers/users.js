const express = require('express')
const data = require("../../data/index")
const users = data.users
const router = express.Router()

router.get('/', (req, res) => {
    return res.json({"users": users})
})

module.exports = router