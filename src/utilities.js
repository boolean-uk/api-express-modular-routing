/**
 * @param {string[]} expectedFields
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {boolean}
 */
function checkForAllFields(expectedFields, req, res) {
  const inputFields = Object.keys(req.body);

  const allFields = expectedFields.every((/** @type {string} */ field) =>
    inputFields.includes(field)
  );

  if (!allFields) {
    res.status(400).json({ error: "Missing fields in request body" });
  }

  return allFields;
}

/**
 * @param {string[]} uniqueFields
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {Object[]} data
 * @returns {boolean}
 */
function checkForExistingFields(uniqueFields, req, res, data) {
  const hasMatchingFields = uniqueFields.every((field) =>
    data.some((item) => item[field] === req.body[field])
  );

  if (hasMatchingFields) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  return hasMatchingFields;
}

/**
 *
 * @param { Object[] } dataArray
 * @param { import("express").Request } req
 * @returns { Object }
 */
function findById(dataArray, req) {
  return dataArray.find((item) => item.id === Number(req.params.id));
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
