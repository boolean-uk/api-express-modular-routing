const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { films: filmData } = require("../../data/index.js");
let nextId = findNextId(filmData);

router.get("/", (req, res) => {
  return res.json({ films: filmData });
});

router.get("/:id", (req, res) => {
  const foundFilm = findById(filmData, req);

  return res.json({ film: foundFilm });
});

router.post("/", (req, res) => {
  const { title, director } = req.body;
  const newFilm = { id: nextId++, title, director };

  filmData.push(newFilm);
  return res.status(201).json({ film: newFilm });
});

router.delete("/:id", (req, res) => {
  const foundFilm = findById(filmData, req);

  filmData.splice(filmData.indexOf(foundFilm), 1);
  return res.json({ film: foundFilm });
});

module.exports = router;
