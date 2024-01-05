const express = require("express")
const router = express.Router()
const { users } = require("../../data/index.js")
const {getEmail, formatUser} = require("../functions/userFunctions.js")

let currentUserId = 3
// ALL USERS
router.get("/", (req, res) => {
    return res.status(200).json({ users })
})

// CREATE USER
router.post("/", (req, res) => {
    const userEmail = getEmail(req)
    const newUser = formatUser(userEmail, currentUserId, users)
    return res.status(201).json(newUser)
})

module.exports = router