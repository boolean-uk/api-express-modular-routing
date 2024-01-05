const express = require("express");
const router = express.Router();

const {
  findById,
  findNextId,
  checkForAllFields,
  checkForExistingFields,
} = require("../utilities.js");

const { books: data } = require("../../data/index.js");
let nextId = findNextId(data);

const itemType = "book";
const expectedFields = ["title", "type", "author"];
const uniqueField = "title";

router.get("/", (req, res) => {
  return res.json({ books: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  res.json({ book: foundItem });
});

router.post("/", (req, res) => {
  const hasAllFields = checkForAllFields(expectedFields, req, res);
  if (!hasAllFields) return;

  const hasMatchingFields = checkForExistingFields(
    uniqueField,
    req,
    res,
    data,
    itemType
  );
  if (hasMatchingFields) return;

  /**
   * @type {Object} newItem
   */
  const newItem = {};
  expectedFields.forEach((field) => {
    newItem[field] = req.body[field];
  });
  newItem.id = nextId++;

  data.push(newItem);
  res.status(201).json({ book: newItem });
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ book: foundItem });
});

router.put("/:id", (req, res) => {
  const hasAllFields = checkForAllFields(expectedFields, req, res);
  if (!hasAllFields) return;

  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  const hasMatchingFields = checkForExistingFields(
    uniqueField,
    req,
    res,
    data,
    itemType
  );

  if (hasMatchingFields) return;

  expectedFields.forEach((field) => {
    foundItem[field] = req.body[field];
  });

  return res.json({ book: foundItem });
});

module.exports = router;
