const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log({uri});

let connection;
const connect = async () => {
  try {
    connection = await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable mongoose buffering
    });
    return connection;
  } catch (e) {
    console.error('Could not connect to MongoDB...');
    throw e;
  }
};

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
