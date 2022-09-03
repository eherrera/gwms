const Gateway = require('../../models/gateway')
const { handleError } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getGateways = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json(await getItems(req, Gateway, query))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getGateways }
