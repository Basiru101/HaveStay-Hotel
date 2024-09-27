// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json()); // This middleware parses JSON request bodies

app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Middleware to use the routes
app.use('/backend/user', userRouter);
app.use('/backend/auth', authRouter);
app.use('/backend/listing', listingRouter);
// app.use('/backend', dashboardRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = res.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
