const express = require("express")
const router = express.Router()
const { users } = require("../../data")
let userId = users.length

router.get("/", (req, res) => {
  res.json({ users })
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((user) => user.id === id)
  if (!user) {
    return res.status(404).json({ error: "A user with the provided ID does not exist" })
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
    return res.status(400).json({ error: "Missing fields in request body" })
  }

  const userWithEmail = users.find((existing) => existing.email === user.email)
  if (userWithEmail) {
    return res
      .status(409)
      .json({ error: "A user with the provided email already exists" })
  }

  users.push(user)

  res.status(201).json({ user: user })
})

router.put("/:id", (req, res) => {
  const userId = Number(req.params.id)
  let user = users.find((user) => user.id === userId)
  if (!user) {
    return res.status(404).json({ error: "A user with the provided ID does not exist" })
  }

  user = {
    ...user,
    ...req.body,
  }
  const userWithEmail = users.find((existing) => existing.email === user.email)
  if (userWithEmail) {
    return res.status(409).json({ error: "A user with the provided email already exists" })
  }

  res.status(201).json({ user: user })
})

router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id)
  const user = users.find((user) => user.id === userId)
  if (!user) {
    return res.status(404).json({ error: "A user with the provided ID does not exist" })
  }
  const index = users.indexOf(user)
  users.splice(index, 1)

  res.status(201).json({ user: user })
})

module.exports = router
