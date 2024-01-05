const express = require("express");
const router = express.Router();

const {
  findById,
  findNextId,
  checkForAllFields,
  checkForExistingFields,
} = require("../utilities.js");

const { users: data } = require("../../data/index.js");
let nextId = findNextId(data);

const itemType = "user"
const expectedFields = ["email"];
const uniqueField = "email";

router.get("/", (req, res) => {
  return res.json({ users: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req);
  if (!foundItem) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
    return;
  }

  res.json({ user: foundItem });
});

router.post("/", (req, res) => {
  const hasAllFields = checkForAllFields(expectedFields, req, res);
  if (!hasAllFields) return;

  const hasUniqueFields = checkForExistingFields(uniqueField, req, res, data, itemType);
  if (!hasUniqueFields) return;

  const { email } = req.body;
  const newItem = { id: nextId++, email };

  data.push(newItem);
  res.status(201).json({ user: newItem });
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req);
  if (!foundItem) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
    return;
  }

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ user: foundItem });
});

router.put("/:id", (req, res) => {
  const foundItem = findById(data, req);
  if (!foundItem) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
    return;
  }

  const hasUniqueFields = checkForExistingFields(uniqueField, req, res, data, itemType);
  if (!hasUniqueFields) return;

  foundItem.email = req.body.email;
  return res.json({ user: foundItem });
});

module.exports = router;
