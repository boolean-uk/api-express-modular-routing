const express = require("express")
const router = express.Router()
const { films } = require("../../data/index")

// GET ALL FILMS
router.get("/", (req, res) => {
    return res.status(200).json({films})
})

module.exports = router