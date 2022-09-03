const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')
const net = require('net')

const maxDevices = 10

const validateUpdateGateway = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('serialNumber')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('ipv4')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .custom(net.isIPv4)
    .withMessage('NOT_A_VALID_IP'),
  check('devices')
    .optional()
    .custom((s) => {
      var devices = JSON.parse(s)
      return devices.length <= maxDevices
    })
    .withMessage(`NO_MORE_THAN_${maxDevices}_DEVICES`),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateGateway }
