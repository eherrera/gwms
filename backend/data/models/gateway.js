const mongoose = require('mongoose');
const { getConnection } = require('../mongoose');
const conn = getConnection();
const Schema = mongoose.Schema;

const schema = new Schema({
  serial_number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  ipv4: { type: String, required: true },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
schema.path('serial_number').index({ unique: true });

module.exports = conn.model('Gateway', schema, { optimisticConcurrency: true });
