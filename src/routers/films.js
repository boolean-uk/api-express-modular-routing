const express = require('express')
const router = express.Router()

const {films} = require('../../data/index.js')

router.get('/', (req, res) => {
  res.status(200).json({films})
})

module.exports = router