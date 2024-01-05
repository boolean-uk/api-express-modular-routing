const express = require("express");
const router = express.Router();

const { findById, findNextId } = require("../utilities.js");

const { books: data } = require("../../data/index.js");
let nextId = findNextId(data);

const expectedFields = ["title", "type", "author"];

router.get("/", (req, res) => {
  return res.json({ books: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req);

  return res.json({ book: foundItem });
});

router.post("/", (req, res) => {
  const { title, type, author } = req.body;
  const newItem = { id: nextId++, title, type, author };

  data.push();
  return res.status(201).json({ book: newItem });
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req);

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ book: foundItem });
});

router.put("/:id", (req, res) => {
  const foundItem = findById(data, req);

  foundItem.title = req.body.title;
  foundItem.type = req.body.type;
  foundItem.author = req.body.author;

  return res.json({ book: foundItem });
});

module.exports = router;
