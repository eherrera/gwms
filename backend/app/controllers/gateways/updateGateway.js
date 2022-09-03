const Gateway = require('../../models/gateway')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateGateway = async (req, res) => {
  try {
    req = matchedData(req)
    console.log({req})
    const id = await isIDGood(req.id)

    devices = req.devices

    let devicesArray = []
    if (devices && devices.length > 0) {
      devicesArray = JSON.parse(devices)
    }
    const gateway = {
      name: req.name,
      serial_number: req.serialNumber,
      ipv4: req.ipv4,
      devices: devicesArray,
      devices_count: devicesArray.length
    }

    res.status(200).json(await updateItem(id, Gateway, gateway))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateGateway }
