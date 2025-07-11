const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
  initDB: async (callback) => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('✅ Connected to MongoDB successfully');
      callback(); // No error, DB is ready
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      callback(err); // Pass the error back to server.js
    }
  }
};
