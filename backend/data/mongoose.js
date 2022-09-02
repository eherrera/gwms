const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log({ uri });

const connect = async (callback) => {
  try {
    console.log('connecting to mongodb...');
    mongoose.connect(
      uri,
      {
        autoIndex: false,
      },
      callback
    );
  } catch (e) {
    console.error('Could not connect to MongoDB...');
    throw e;
  }
};

module.exports = { connect };
