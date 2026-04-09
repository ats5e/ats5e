require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// DB Connection
let mongoUri = process.env.MONGODB_URI;
const allowInMemoryFallback = process.env.NODE_ENV !== 'production';

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected successfully');
    return true;
  } catch (err) {
    console.warn('\n--- ERROR: MONGODB ATLAS CONNECTION FAILED ---');
    console.warn(err.message);

    if (!allowInMemoryFallback) {
      console.error('In-memory database fallback is disabled in production.');
      return false;
    }

    console.warn('\nFalling back to local in-memory MongoDB database to make it work locally...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('In-memory MongoDB connected successfully at', mongoUri);
      
      const { seedData } = require('./seed');
      await seedData();
      console.log('In-memory Database seeded with default data.');
      return true;
    } catch (fallbackErr) {
      console.error('Failed to start in-memory MongoDB:', fallbackErr);
      return false;
    }
  }
}

async function startServer() {
  const databaseReady = await connectToDatabase();

  if (!databaseReady) {
    console.error('Server did not start because a database connection could not be established.');
    process.exit(1);
    return;
  }

  // Routes (loaded AFTER database connection is established to avoid mongoose model buffering issues)
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/crud', require('./routes/crud'));
  app.use('/api/upload', require('./routes/upload'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

startServer();
