const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { films: data } = require("../../data/index.js");
let nextId = findNextId(data);

router.get("/", (req, res) => {
  return res.json({ films: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req);

  return res.json({ film: foundItem });
});

router.post("/", (req, res) => {
  const { title, director } = req.body;
  const newItem = { id: nextId++, title, director };

  data.push(newItem);
  return res.status(201).json({ film: newItem });
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req);

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ film: foundItem });
});

router.put("/:id", (req, res) => {
  const foundItem = findById(data, req);

  foundItem.title = req.body.title;
  foundItem.director = req.body.director;
  return res.json({ film: foundItem });
});

module.exports = router;
