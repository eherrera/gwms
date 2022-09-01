const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));

// welcome
app.get('/', async (req, res) => {
  return res.status(200).send('welcome to gateways backend by eherrera');
});


module.exports = app;
