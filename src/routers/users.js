
const express = require('express')
const router = express.Router()
const usersData = require('../../data/index.js')

router.get('/', (req , res) => {
  return   res.status(200).json({usersData})
})








module.exports = router