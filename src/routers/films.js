const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { films: filmData } = require("../../data/index.js");
let nextId = findNextId(filmData);

module.exports = router