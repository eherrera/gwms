const { validateCreateGateway } = require('./validateCreateGateway')
const { validateGetGateway } = require('./validateGetGateway')
const { validateDeleteGateway } = require('./validateDeleteGateway')

module.exports = {
  validateCreateGateway,
  validateGetGateway,
  validateDeleteGateway
}
