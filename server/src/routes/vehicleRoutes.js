import express from "express";
import {
  getVehicles,
  getVehicleBySlug,
  getVehicleById,
  getFeaturedVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  toggleFeatured,
  toggleStatus,
  deleteVehicleImage,
  uploadVehicleImages,
} from "../controllers/vehicleController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getVehicles);
router.get("/featured", getFeaturedVehicles);
router.get("/slug/:slug", getVehicleBySlug);
router.get("/:id", getVehicleById);

// Admin routes (protected)
router.post("/", protect, upload.array("images", 10), createVehicle);
router.put("/:id", protect, upload.array("images", 10), updateVehicle);
router.delete("/:id", protect, deleteVehicle);
router.patch("/:id/featured", protect, toggleFeatured);
router.patch("/:id/status", protect, toggleStatus);
router.post("/:id/images", protect, upload.array("images", 10), uploadVehicleImages);
router.delete("/:id/images/:imageIndex", protect, deleteVehicleImage);

export default router;
