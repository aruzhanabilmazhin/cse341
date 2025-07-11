const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contacts');
const mongodb = require('./database/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/contacts', contactRoutes);

// Root route (health check)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Contacts API is running',
    status: 'OK',
    timestamp: new Date(),
  });
});

// Connect to MongoDB and start the server
mongodb.initDB((err) => {
  if (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  }
});
