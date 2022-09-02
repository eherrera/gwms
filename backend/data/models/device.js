const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  uid: { type: Number, required: true, unique: true },
  vendor: { type: String, required: true },
  created: { type: Date },
  status: Boolean,
  gateway: { type: Schema.Types.ObjectId, ref: 'Gateway' },
});
schema.path('uid').index({ unique: true });

module.exports = mongoose.model('Device', schema, {
  optimisticConcurrency: true,
});
