import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createEnquiry);

// Admin (protected)
router.get("/", protect, getEnquiries);
router.get("/:id", protect, getEnquiryById);
router.patch("/:id/status", protect, updateEnquiryStatus);
router.delete("/:id", protect, deleteEnquiry);

export default router;
