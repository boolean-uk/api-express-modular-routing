const express = require("express")
const router = express.Router()
const { users } = require("../../data/index.js")
const { getEmail, createUser, formatUser, findUser, deleteUser } = require("../functions/userFunctions.js")

let currentUserId = 3
// ALL USERS
router.get("/", (req, res) => {
    return res.status(200).json({ users })
})

// CREATE USER
router.post("/", (req, res) => {
    const userEmail = getEmail(req, res, users)
    const newUser = createUser(userEmail, currentUserId, users)
    return res.status(201).json(formatUser(newUser))
})

// GET USER BY ID
router.get("/:id", (req, res) => {
    const user = findUser(req, res, users)
    return res.status(200).json(formatUser(user))
})

// DELETE USER BY ID
router.delete("/:id", (req, res) => {
    const user = findUser(req, res, users)
    deleteUser(user, users)
    return res.status(200).json(formatUser(user))
})

// UPDATE USER BY ID
router.put("/:id", (req, res) => {
    const newEmail = getEmail(req, res)
    const user = findUser(req, res, users)
    user.email = newEmail
    return res.status(200).json(formatUser(user))
})

module.exports = router