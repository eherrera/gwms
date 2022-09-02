require('dotenv-safe').config()
import { Seeder } from 'mongo-seeding'
import { resolve } from 'path'
const config = {
  database: process.env.MONGO_URI,
  inputPath: resolve(__dirname, './data'),
  dropDatabase: false
}
const seeder = new Seeder(config)
const collections = seeder.readCollectionsFromPath(resolve('./data'))

const main = async () => {
  try {
    await seeder.import(collections)
    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

main()
