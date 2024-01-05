// Import data here...
const express = require('express')
const {users} = require("../../data/index")
const router = express.Router()


// Get request for all films 
router.get("/", (req, res) => {
res.status(200).json({users: users})
})

// Get request for a single id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id)

    if(user){
        res.status(200).json({user: user})
    } else {
        res.status(404).json({error: "No such user with this id"})
    }
})

// Write routes here...
module.exports = router