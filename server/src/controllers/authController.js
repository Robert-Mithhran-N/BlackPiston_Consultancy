import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../utils/mailer.js";

/**
 * @desc    Login admin
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find admin and include password field
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email address",
      });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id, admin.role),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get current admin profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Request Password Reset OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address",
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found with that email",
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    admin.resetOtpHash = hashedOtp;
    admin.resetOtpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    admin.resetOtpVerifiedAt = null;
    await admin.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Verify Password Reset OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and OTP code",
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!admin.resetOtpHash || !admin.resetOtpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "No OTP reset session requested",
      });
    }

    if (Date.now() > admin.resetOtpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one",
      });
    }

    const isValid = await bcrypt.compare(otp, admin.resetOtpHash);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP code",
      });
    }

    admin.resetOtpVerifiedAt = Date.now();
    await admin.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Reset Password using OTP verification status
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!admin.resetOtpVerifiedAt) {
      return res.status(400).json({
        success: false,
        message: "OTP verification is required before resetting password",
      });
    }

    // Verification session expires in 10 minutes
    const verificationExpiry = 10 * 60 * 1000;
    if (Date.now() - new Date(admin.resetOtpVerifiedAt).getTime() > verificationExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP verification session expired. Please verify OTP again",
      });
    }

    // Update password (will be hashed in the pre-save mongoose middleware!)
    admin.password = newPassword;

    // Clear reset OTP fields
    admin.resetOtpHash = undefined;
    admin.resetOtpExpiresAt = undefined;
    admin.resetOtpVerifiedAt = undefined;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
