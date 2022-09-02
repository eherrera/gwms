const express = require('express')
const router = express.Router()
require('../../config/passport')
const trimRequest = require('trim-request')

const { createGateway, getGateways } = require('../controllers/gateways')

const { validateCreateGateway } = require('../controllers/gateways/validators')

/*
 * Gateways routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getGateways
)

/*
 * Create new item route
 */
router.post('/', trimRequest.all, validateCreateGateway, createGateway)

// /*
//  * Get item route
//  */
// router.get(
//   '/:id',
//   // requireAuth,
//   // roleAuthorization(['admin']),
//   trimRequest.all,
//   validateGetUser,
//   getUser
// )

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
