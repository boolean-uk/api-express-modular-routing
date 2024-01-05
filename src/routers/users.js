// Import data here...
const express = require('express')
const {users} = require("../../data/index")
const router = express.Router()


// Get request for all users
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

// Post request to create new user
router.post("/", (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    return res.status(201).json({user: newUser})
})

// Put request to update users
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundUser = users.find(user => user.id === id)
    
    const updates = req.body;
    Object.assign(foundUser, updates)
    
    return res.status(200).json({user: foundUser})
    })
    
    // Delete request to delete user
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const foundUserId = users.findIndex(user => user.id === id);

    if (foundUserId === -1) {
        return res.status(404).json({ error: "No such user with this id" });
    }

    const deleteUser = users.splice(foundUserId, 1)[0];

    return res.status(200).json({ user: deleteUser });
});

        
// Write routes here...
module.exports = router