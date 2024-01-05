/**
 * @param {string[]} expectedFields
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {boolean}
 */
function checkForAllFields(expectedFields, req, res) {
  const inputFields = Object.keys(req.body);

  const allFields = expectedFields.every((/** @type {string} */ field) =>
    inputFields.includes(field),
  );

  if (!allFields) {
    res.status(400).json({ error: "Missing fields in request body" });
  }

  return allFields;
}

/**
 * @param {string} uniqueField
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {Object[]} data
 * @param {string} itemType
 * @returns {boolean}
 */
function checkForExistingFields(uniqueField, req, res, data, itemType) {
  const hasMatchingField = data.some(
    (item) => item[uniqueField] === req.body[uniqueField],
  );

  if (hasMatchingField) {
    res.status(409).json({
      error: `A ${itemType} with the provided ${uniqueField} already exists`,
    });
  }

  return hasMatchingField;
}

/**
 *
 * @param { Object[] } dataArray
 * @param { import("express").Request } req
 * @param {import("express").Response} res
 * @param {string} itemType
 * @returns { Object }
 */
function findById(dataArray, req, res, itemType) {
  const foundItem = dataArray.find((item) => item.id === Number(req.params.id));

  if (!foundItem) {
    res
      .status(404)
      .json({ error: `A ${itemType} with the provided ID does not exist` });
  }

  return foundItem;
}

/**
 *
 * @param { Object[] } dataArray
 * @returns { number }
 */
function findNextId(dataArray) {
  return dataArray.reduce((a, b) => (a > b.id ? a : b.id), 0) + 1;
}

module.exports = {
  checkForAllFields,
  checkForExistingFields,
  findById,
  findNextId,
};
