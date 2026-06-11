import express from "express";
import {
  loginAdmin,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

// Rate limit: max 5 requests per 15 minutes for forgot password
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many password reset requests. Please try again after 15 minutes.",
  },
});

router.post("/login", loginAdmin);
router.get("/me", protect, getMe);

// OTP password reset flow
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
