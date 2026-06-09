import mongoose from "mongoose";

/**
 * Middleware to check database connection status.
 * If the database is not connected, it returns a clear, actionable error
 * instead of letting Mongoose fail with bufferCommands errors.
 */
export const dbCheck = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database connection is not established. If you are running locally, please make sure your IP address is whitelisted in MongoDB Atlas Network Access settings, or check your MONGODB_URI in the server .env file.",
    });
  }
  next();
};
