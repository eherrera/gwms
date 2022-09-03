const awsServerlessExpress = require('aws-serverless-express')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const app = require('./server-aws')
  const server = awsServerlessExpress.createServer(app)
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise
}
