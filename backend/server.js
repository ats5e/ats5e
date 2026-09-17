require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();

// Middleware
// Behind Nginx in production, so trust the first proxy hop for accurate client IPs (rate limiting).
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// CORS_ORIGINS is a comma-separated allowlist, e.g. "https://ats5e.com,https://www.ats5e.com".
// When unset (local development) all origins are allowed.
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((origin) => origin.trim()).filter(Boolean);
app.use(cors(allowedOrigins.length ? { origin: allowedOrigins } : undefined));
app.use(express.json({ limit: '1mb' }));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: 'Too many login attempts. Please try again later.' },
});
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
  const authRoutes = require('./routes/auth');
  const crudRoutes = require('./routes/crud');
  const uploadRoutes = require('./routes/upload');
  const contactRoutes = require('./routes/contact');

  // Support local development and direct access (where /api is preserved)
  app.use(['/api/auth/login', '/auth/login'], loginLimiter);
  app.use('/api/auth', authRoutes);
  app.use('/api/crud', crudRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/contact', contactRoutes);

  // Support production reverse proxy (which strips /api prefix)
  app.use('/auth', authRoutes);
  app.use('/crud', crudRoutes);
  app.use('/upload', uploadRoutes);
  app.use('/contact', contactRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

startServer();
