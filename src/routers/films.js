const { films } = require('../../data/index.js')

const express = require('express')
const router = express.Router()


router.get("/", (req, res) => {
    return res.status(200).json({ films: films });
});


module.exports = router