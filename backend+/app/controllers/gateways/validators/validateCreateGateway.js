const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')
const net = require('net')

/**
 * Validates create new item request
 */
const validateCreateGateway = [
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
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateGateway }
