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

const itemType = "user";
const expectedFields = ["email"];
const uniqueField = "email";

router.get("/", (req, res) => {
  return res.json({ users: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  res.json({ user: foundItem });
});

router.post("/", (req, res) => {
  const hasAllFields = checkForAllFields(expectedFields, req, res);
  if (!hasAllFields) return;

  const hasUniqueFields = checkForExistingFields(
    uniqueField,
    req,
    res,
    data,
    itemType,
  );
  if (!hasUniqueFields) return;

  /**
   * @type {Object} newItem
   */
  const newItem = {};
  expectedFields.forEach((field) => {
    newItem[field] = req.body[field];
  });
  newItem.id = nextId++;

  data.push(newItem);
  res.status(201).json({ user: newItem });
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ user: foundItem });
});

router.put("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  const hasUniqueFields = checkForExistingFields(
    uniqueField,
    req,
    res,
    data,
    itemType,
  );
  if (!hasUniqueFields) return;

  foundItem.email = req.body.email;
  return res.json({ user: foundItem });
});

module.exports = router;
