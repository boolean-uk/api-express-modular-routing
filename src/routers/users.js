const express = require("express");
const router = express.Router();

// Import data here...
const data = require("../../data");
const users = data.users;
 
// Write routes here...
router.get("/", (req, res) => {
    // 1. send back a response with all contacts
    res.json(users)
  })

// get by a user by id
router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find(item => item.id === id)
    
    res.json(user)
  })

  // CREATE A USER
router.post("/", (req, res) => {
    const user = (req.body)
    users.push(user)
    res.json(user)
})
// UPDATE A a USER BY ID
router.patch("/:id", (req, res) => {
    
    const id = Number(req.params.id)
    let user = users.find(item => item.id === id)

    const updatedUser= {
        "id": id,
        "email": req.body.email
   }
   let index = users.indexOf(user)
   if (index !== -1) {
    users[index]= updatedUser
  }
    res.json(updatedUser)
  })

// DELETE A USER BY ID
router.delete("/:id", (req, res) => {
    
    const id = Number(req.params.id)
    const user = users.find(item => item.id === id)
    let index = users.indexOf(user);
    users.splice(index, 1)
    // 4. send it back in the response
    res.json(users)
  })

  module.exports = router;
  