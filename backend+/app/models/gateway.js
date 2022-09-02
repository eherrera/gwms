const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const GatewaySchema = new mongoose.Schema(
  {
    serial_number: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ipv4: { type: String, required: true },
    devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
  },
  {
    versionKey: false,
    timestamps: true
  }
)
GatewaySchema.path('serial_number').index({ unique: true })

GatewaySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Gateway', GatewaySchema)
