const express = require('express')
const router = express.Router() 
const data = require('../../data/index')
const films = data.films

router.get("/", ((req, res) => (res.json({"films": films}))))

module.exports = router