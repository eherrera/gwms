const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { buildErrObject } = require('../../middleware/utils')
const { gatewayExists } = require('../../middleware/gateways')
const Gateway = require('../../models/gateway')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = ({
  serialNumber = '',
  name = '',
  ipv4 = '',
  devices = ''
}) => {
  return new Promise((resolve, reject) => {
    let devicesArray = []
    if (devices && devices.length > 0) {
      devicesArray = JSON.parse(devices)
    }
    const gateway = new Gateway({
      name,
      serial_number: serialNumber,
      ipv4,
      devices: devicesArray,
      devices_count: devicesArray.length
    })
    gateway.save((err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }

      resolve(item)
    })
  })
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createGateway = async (req, res) => {
  try {
    req = matchedData(req)
    
    const doesGatewayExists = await gatewayExists(req.serialNumber)
    if (!doesGatewayExists) {
      const item = await createItemInDb(req)

      res.status(201).json(item)
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createGateway }
