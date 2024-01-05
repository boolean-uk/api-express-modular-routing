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
  findById,
  findNextId,
};
