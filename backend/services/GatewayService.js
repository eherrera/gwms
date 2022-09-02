const MongooseService = require('./MongooseService'); // Data Access Layer
const Gateway = require('../data/models/gateway'); // Database Model


class GatewayService {
  /**
   * @description Create an instance of GatewayService
   */
  constructor() {
    // Create instance of Data Access layer using our desired model
    this.MongooseServiceInstance = new MongooseService(Gateway);
  }

  /**
   * @description Attempt to create a gateway with the provided object
   * @param gatewayToCreate {CreateGatewayInput} Object containing all required fields to create gateway
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async create(gatewayToCreate) {
    try {
      const model = {
        serial_number: gatewayToCreate.serialNumber,
        name: gatewayToCreate.name,
        ipv4: gatewayToCreate.ipv4,
      };
      console.log({model});

      // await Gateway.createCollection();

      // const doc = new Gateway(model);
      // const result = doc.save(function(errr, small) {
      //   if (errr) console.log({errr});
      // });

      const result = await this.MongooseServiceInstance.create(model);
      console.log({result});
      return { success: true, body: doc, code: 201 };
    } catch (errserv) {
      console.log({errserv});
      return { success: false, error: errserv, code: 500 };
    }
  }
}

module.exports = GatewayService;
