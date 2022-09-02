const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')

const { createGateway } = require('../controllers/gateways')

const { validateCreateGateway } = require('../controllers/gateways/validators')

/*
 * Gateways routes
 */

// /*
//  * Get items route
//  */
// router.get(
//   '/',
//   // requireAuth,
//   // roleAuthorization(['admin']),
//   trimRequest.all,
//   getUsers
// )

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
