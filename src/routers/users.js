const express = require('express')
const router = express.Router()
const { users } = require('../../data/index')

router.get('/', (req, res, next) => {
  res.status(200).json({
    users: users
  })
})

module.exports = router
