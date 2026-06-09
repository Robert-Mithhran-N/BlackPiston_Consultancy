import express from "express";
import upload from "../middleware/upload.js";
import { uploadVehicleImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/vehicle-image",
  upload.single("image"),
  uploadVehicleImage
);

export default router;
