const express = require("express");
const router = express.Router();
const data = require('../../data/index.js')
const users = data.users
router.get("/", (req, res) => {
  res.status(200).json({users:users });
});
module.exports = router;
