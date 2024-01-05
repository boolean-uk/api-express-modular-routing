const express = require("express");
const router = express.Router();

const { findById, findNextId, checkForAllFields } = require("../utilities.js");

const { users: data } = require("../../data/index.js");
let nextId = findNextId(data);

const expectedFields = ["email"];

router.get("/", (req, res) => {
  return res.json({ users: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req);

  return res.json({ user: foundItem });
});

router.post("/", (req, res) => {
  const hasAllFields = checkForAllFields(expectedFields, req, res);

  if (hasAllFields) {
    const { email } = req.body;
    const newItem = { id: nextId++, email };

    data.push(newItem);
    return res.status(201).json({ user: newItem });
  }
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req);

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ user: foundItem });
});

router.put("/:id", (req, res) => {
  const foundItem = findById(data, req);

  foundItem.email = req.body.email;
  return res.json({ user: foundItem });
});

module.exports = router;
