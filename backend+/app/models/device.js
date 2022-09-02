const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const DeviceSchema = new mongoose.Schema(
  {
    uid: { type: Number, required: true, unique: true },
    vendor: { type: String, required: true },
    created: { type: Date },
    status: Boolean,
    gateway: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
DeviceSchema.path('uid').index({ unique: true })

DeviceSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Device', DeviceSchema)
