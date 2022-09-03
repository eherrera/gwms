const express = require('express')
const router = express.Router()
require('../../config/passport')
const trimRequest = require('trim-request')

const {
  createGateway,
  getGateways,
  getGateway
} = require('../controllers/gateways')

const {
  validateCreateGateway,
  validateGetGateway
} = require('../controllers/gateways/validators')

/*
 * Gateways routes
 */

/*
 * Get items route
 */
router.get('/', trimRequest.all, getGateways)

/*
 * Create new item route
 */
router.post('/', trimRequest.all, validateCreateGateway, createGateway)

/*
 * Get item route
 */
router.get('/:id', trimRequest.all, validateGetGateway, getGateway)

// /*
//  * Update item route
//  */
// router.patch(
//   '/:id',
//   // requireAuth,
//   // roleAuthorization(['admin']),
//   trimRequest.all,
//   validateUpdateUser,
//   updateUser
// )

// /*
//  * Delete item route
//  */
// router.delete(
//   '/:id',
//   // requireAuth,
//   // roleAuthorization(['admin']),
//   trimRequest.all,
//   validateDeleteUser,
//   deleteUser
// )

module.exports = router
