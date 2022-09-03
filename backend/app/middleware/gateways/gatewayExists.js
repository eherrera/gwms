const Gateway = require('../../models/gateway')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks Gateway model if gateway with an specific serial number exists
 * @param {string} serialNumber - gateway serial number
 */
const gatewayExists = (serialNumber = '') => {
  return new Promise((resolve, reject) => {
    Gateway.findOne(
      {
        serial_number: serialNumber
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'GATEWAY_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { gatewayExists }
