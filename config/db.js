const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
  initDB: (callback) => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      callback(err);
    });

    db.once('open', () => {
      console.log('✅ Connected to MongoDB successfully');
      callback();
    });
  }
};
