// Import data here...
const express = require('express')
const {users} = require("../../data/index")
const router = express.Router()


// Get request for all films 
router.get("/", (req, res) => {
res.status(200).json({users: users})
})

// Write routes here...
module.exports = router