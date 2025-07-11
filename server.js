const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes'); // Or contacts.js, depending on your file name
const mongodb = require('./config/db'); // ✅ FIXED this line

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Contacts API is running',
    status: 'OK',
    timestamp: new Date(),
  });
});

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
