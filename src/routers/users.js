const users = require('../../data/index')

let userId = 0
const getNewUserId = () => ++userId

class User {
  constructor(email){
    this.email = email
  }
}

const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>
  res.json({ users })
)

module.exports = router