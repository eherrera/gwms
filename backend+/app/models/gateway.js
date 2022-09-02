const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const GatewaySchema = new mongoose.Schema(
  {
    serial_number: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ipv4: { type: String, required: true },
    devices_count: { type: Number },
    devices: [
      {
        uid: { type: Number, required: true },
        vendor: { type: String, required: true },
        created: { type: Date, required: true },
        status: { type: Boolean, required: true },
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)
GatewaySchema.path('serial_number').index({ unique: true })

GatewaySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Gateway', GatewaySchema)
