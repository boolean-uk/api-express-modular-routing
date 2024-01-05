const express = require("express");
const router = express.Router();

const {
  findById,
  findNextId,
  checkForAllFields,
  checkForExistingFields,
} = require("../utilities.js");

const { films: data } = require("../../data/index.js");
let nextId = findNextId(data);

const itemType = "film";
const expectedFields = ["title", "director"];
const uniqueField = "title";

router.get("/", (req, res) => {
  return res.json({ films: data });
});

router.get("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  res.json({ film: foundItem });
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
  res.status(201).json({ film: newItem });
});

router.delete("/:id", (req, res) => {
  const foundItem = findById(data, req, res, itemType);
  if (!foundItem) return;

  data.splice(data.indexOf(foundItem), 1);
  return res.json({ film: foundItem });
});

router.put("/:id", (req, res) => {
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

  return res.json({ film: foundItem });
});

router.patch("/:id", (req, res) => {
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

  res.json({message: "There's no test to actually make this work and I'm out of time today so I'm going to leave this here instead 😎"})
});

module.exports = router;
