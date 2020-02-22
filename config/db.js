const mongoos = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    // useNewUrlParser: true , useCreateIndex: true - disables deprecation error in console
    await mongoos.connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
    console.log('mongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
