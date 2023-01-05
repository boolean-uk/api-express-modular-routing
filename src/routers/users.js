const express = require("express");
const router = express.Router()
const {users} = require("../../data/index.js")

let id = 0

router.get("/", (req, res) => {
    res.json(users)
})

router.post("/", (req, res) => {
    id += 0
    const user = {id: id, ...(req.body)}
    console.log(users)
    users.push(user)
    res.json(user)
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    res.json(user)
})

module.exports = router