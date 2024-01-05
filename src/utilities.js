/**
 *
 * @param { Object[] } dataArray
 * @returns { number }
 */
function findNextId(dataArray) {
  return dataArray.reduce((a, b) => (a > b.id ? a : b.id), 0) + 1;
}

module.exports = {
  findNextId,
};
