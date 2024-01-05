const express = require("express")
const router = express.Router()
const { users } = require("../../data/index.js")
const { getEmail, createUser, formatUser, findUser } = require("../functions/userFunctions.js")

let currentUserId = 3
// ALL USERS
router.get("/", (req, res) => {
    return res.status(200).json({ users })
})

// CREATE USER
router.post("/", (req, res) => {
    const userEmail = getEmail(req)
    const newUser = createUser(userEmail, currentUserId, users)
    return res.status(201).json(formatUser(newUser))
})

// GET USER BY ID
router.get("/:id", (req, res) => {
    const user = findUser(req, res, users)
    return res.status(200).json(formatUser(user))
})

module.exports = router