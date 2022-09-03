const { validateCreateGateway } = require('./validateCreateGateway')
const { validateGetGateway } = require('./validateGetGateway')
const { validateDeleteGateway } = require('./validateDeleteGateway')
const { validateUpdateGateway } = require('./validateUpdateGateway')

module.exports = {
  validateCreateGateway,
  validateGetGateway,
  validateDeleteGateway,
  validateUpdateGateway
}
