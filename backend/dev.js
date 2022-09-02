let jsonData = require('./env.dev.json');

const mongodb_uri = jsonData.MONGODB_URI;
process.env['MONGODB_URI'] = mongodb_uri;

const app = require('./app');
const { connect } = require('./data/mongoose');

const port = 4000;

connect(() => {
  console.log(`connected to mongodb`);
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
