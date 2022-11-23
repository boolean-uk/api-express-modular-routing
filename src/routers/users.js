const express = require("express")
const router = express.Router()
let { users } = require("../../data")
let userId = users.length

router.get("/", (req, res) => {
  res.json({ users })
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user) => user.id === id)
  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }

  res.json({ user })
})

router.post("/", (req, res) => {
  userId++

  const user = {
    ...req.body,
    id: userId,
  }
  if (!user.email) {
    return res.status(400).json({ error: "user email is required" })
  }

  const userWithEmail = users.find((existing) => existing.email === user.email)
  if (userWithEmail) {
    return res
      .status(409)
      .json({ error: "a user with that email address already exists" })
  }

  users.push(user)

  res.status(201).json({ user: user })
})

router.put("/:id", (req, res) => {
  const userId = Number(req.params.id)
  let user = users.find((user) => user.id === userId)
  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }

  user = {
    ...user,
    ...req.body,
  }
  const userWithEmail = users.find((existing) => existing.email === user.email)
  if (userWithEmail) {
    return res.status(409).json({ error: "a user with that email address already exists" })
  }

  res.status(201).json({ user: user })
})

router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id)
  const user = users.find((user) => user.id === userId)
  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }
  console.log(users)
  users = users.filter((existing) => user.id !== existing.id)
  console.log(users)

  res.status(201).json({ user: user })
})

module.exports = router
