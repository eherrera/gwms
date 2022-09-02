const express = require('express');

const app = express();
app.use(express.json());

// welcome
app.get('/', async (req, res) => {
  return res.status(200).send('welcome to gateways backend by eherrera');
});

// create gateway with devices
app.post('/gateway', async (req, res) => {
  try {
    const GatewayService = require('./services/GatewayService'); // Service Layer
    const gatewayServiceInstance = new GatewayService();
    const createdGateway = await gatewayServiceInstance.create(req.body);
    return res.status(createdGateway.code).send(createdGateway);
  } catch (errctrl) {
    console.log({errctrl});
    res.status(500).send(errctrl);
  }
});

module.exports = app;
