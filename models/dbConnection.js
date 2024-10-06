
const mongoose = require('mongoose');


// Test DB in Local
var database_uri = 'mongodb://localhost/pannlab'


async function connectToDatabase() {
  try {

    // Connect to MongoDB (replace 'yourMongoDBUri' with your actual MongoDB URI)
    await mongoose.connect(database_uri);

    console.log('Successfully connected to database');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connectToDatabase,
};