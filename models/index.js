
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {

    // Connect to MongoDB (replace 'yourMongoDBUri' with your actual MongoDB URI)
    await mongoose.connect('mongodb://localhost/pannlab');

    console.log('Successfully connected to database');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connectToDatabase,
};