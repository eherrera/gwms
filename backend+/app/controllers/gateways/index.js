const { createGateway } = require('./createGateway')
const { getGateways } = require('./getGateways')
const { getGateway } = require('./getGateway')
const { deleteGateway } = require('./deleteGateway')
const { updateGateway } = require('./updateGateway')

module.exports = {
  createGateway,
  getGateways,
  getGateway,
  deleteGateway,
  updateGateway
}
