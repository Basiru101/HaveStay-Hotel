import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import paymentRoutes from "./routes/payment.route.js";
import cookieParser from "cookie-parser";
import Stripe from "stripe"; // Import Stripe
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3000;

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware to parse JSON bodies
// app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// Middleware to use the routes
app.use("/backend/user", userRouter);
app.use("/backend/auth", authRouter);
app.use("/backend/listing", listingRouter);
app.use("/backend/payments", paymentRoutes);
// app.use('/backend/payments', paymentRoutes); // Corrected path

// Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = res.statusCode || 500;
//   const message = res.message;
//   console.log(res);

//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//     payload: req.body,
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
