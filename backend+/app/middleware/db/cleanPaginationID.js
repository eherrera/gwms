/**
 * Hack for mongoose-paginate, removes 'id' and nested from results
 * @param {Object} result - result object
 */
const cleanPaginationIDAndNested = (result = {}) => {
  result.docs.map((element) => {delete element.id; delete element.devices})
  return result
}

module.exports = { cleanPaginationIDAndNested }
