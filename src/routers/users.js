const express = require('express');
const router = express.Router();

const users = require("../../data/index.js")

router.get('/', (req, res) => {
    res.status(200).json({users: users.users})
})
module.exports = router;