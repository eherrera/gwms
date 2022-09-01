const mongoose = require('mongoose');
const { getConnection } = require('../mongoose');
const conn = getConnection();
const Schema = mongoose.Schema;

const schema = new Schema({
  uid: { type: Number, required: true, unique: true },
  vendor: { type: String, required: true },
  created: { type: Date },
  status: Boolean,
  gateway: { type: Schema.Types.ObjectId, ref: 'Gateway' }
});
schema.path('uid').index({ unique: true });

module.exports = conn.model('Device', schema, { optimisticConcurrency: true });
