const faker = require('faker')

const genDevices = (count) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push({
      uid: faker.datatype.number({
        min: 10000000,
        max: 99999999
      }),
      vendor: faker.company.companyName(),
      created: faker.date.past(),
      status: faker.datatype.boolean()
    })
  }
  return result
}

const genGateways = (count) => {
  const result = []
  for (let i = 0; i < count; i++) {
    devices = genDevices(faker.datatype.number({ min: 1, max: 10 }))

    result.push({
      //   _id: new ObjectID(faker.random.hexaDecimal(24)),
      serial_number: faker.datatype.uuid(),
      name: `Gateway ${faker.random.alphaNumeric(6)}`,
      ipv4: faker.internet.ip(),
      devices_count: devices.length,
      devices
    })
  }
  return result
}
module.exports = genGateways(25)