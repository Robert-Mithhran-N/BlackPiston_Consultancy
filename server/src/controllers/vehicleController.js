import Vehicle from "../models/Vehicle.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/**
 * Upload buffer to Cloudinary via stream
 */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blackpiston/vehicles" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Process uploaded files — try Cloudinary, fall back to base64 data URI
 */
const processImages = async (files) => {
  const images = [];

  for (const file of files) {
    try {
      const result = await uploadToCloudinary(file.buffer);
      images.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err) {
      // Fallback: store as base64 data URI (works without Cloudinary)
      const base64 = file.buffer.toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64}`;
      images.push({
        url: dataUri,
        publicId: "",
      });
    }
  }

  return images;
};

/**
 * @desc    Get all active vehicles (public) with filters, search, sort, pagination
 * @route   GET /api/vehicles
 * @access  Public
 */
export const getVehicles = async (req, res) => {
  try {
    const {
      category,
      type,
      brand,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      search,
      sort,
      page = 1,
      limit = 50,
      featured,
      admin, // if "true", return all vehicles (admin use)
    } = req.query;

    const filter = {};

    // Public requests only see active vehicles
    if (admin !== "true") {
      filter.isActive = true;
    }

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (fuelType) filter.fuelType = fuelType;
    if (transmission) filter.transmission = transmission;
    if (featured === "true") filter.featured = true;

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Year range
    if (minYear || maxYear) {
      filter.year = {};
      if (minYear) filter.year.$gte = Number(minYear);
      if (maxYear) filter.year.$lte = Number(maxYear);
    }

    // Keyword search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tagline: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOption = { price: -1 };
    else if (sort === "newest") sortOption = { year: -1, createdAt: -1 };
    else if (sort === "featured") sortOption = { featured: -1, createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Vehicle.countDocuments(filter);
    const vehicles = await Vehicle.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: vehicles.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get vehicle by slug
 * @route   GET /api/vehicles/slug/:slug
 * @access  Public
 */
export const getVehicleBySlug = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get vehicle by ID
 * @route   GET /api/vehicles/:id
 * @access  Public
 */
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get featured vehicles
 * @route   GET /api/vehicles/featured
 * @access  Public
 */
export const getFeaturedVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      featured: true,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Create vehicle
 * @route   POST /api/vehicles
 * @access  Admin
 */
export const createVehicle = async (req, res) => {
  try {
    const {
      title,
      category,
      type,
      brand,
      model,
      year,
      price,
      fuelType,
      transmission,
      mileage,
      power,
      topSpeed,
      acceleration,
      color,
      description,
      tagline,
      features,
      featured,
      isActive,
    } = req.body;

    // Parse features if sent as JSON string
    let parsedFeatures = features;
    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch {
        parsedFeatures = features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    // Process uploaded images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = await processImages(req.files);
    }

    const vehicle = await Vehicle.create({
      title,
      category,
      type,
      brand,
      model: model || "",
      year: Number(year),
      price: Number(price),
      fuelType: fuelType || "Petrol",
      transmission: transmission || "Automatic",
      mileage: mileage ? Number(mileage) : 0,
      power: power || "",
      topSpeed: topSpeed || "",
      acceleration: acceleration || "",
      color: color || "",
      description: description || "",
      tagline: tagline || "",
      features: parsedFeatures || [],
      images,
      featured: featured === "true" || featured === true,
      isActive: isActive !== "false" && isActive !== false,
    });

    res.status(201).json({ success: true, data: vehicle });
  } catch (error) {
    console.error("[createVehicle] Error:", error.message, error.stack);

    // Mongoose validation error — return field-level messages
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ success: false, message: messages });
    }

    // Duplicate key (e.g. slug collision)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue).join(", ");
      return res.status(409).json({
        success: false,
        message: `A vehicle with that ${field} already exists. Please use a different title.`,
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update vehicle
 * @route   PUT /api/vehicles/:id
 * @access  Admin
 */
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Parse features if sent as JSON string
    if (req.body.features && typeof req.body.features === "string") {
      try {
        req.body.features = JSON.parse(req.body.features);
      } catch {
        req.body.features = req.body.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
      }
    }

    // Handle boolean fields
    if (req.body.featured !== undefined) {
      req.body.featured =
        req.body.featured === "true" || req.body.featured === true;
    }
    if (req.body.isActive !== undefined) {
      req.body.isActive =
        req.body.isActive === "true" || req.body.isActive === true;
    }

    // Process new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = await processImages(req.files);
      req.body.images = [...vehicle.images, ...newImages];
    }

    Object.assign(vehicle, req.body);
    const updatedVehicle = await vehicle.save();

    res.status(200).json({ success: true, data: updatedVehicle });
  } catch (error) {
    console.error("[updateVehicle] Error:", error.message, error.stack);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message).join(", ");
      return res.status(400).json({ success: false, message: messages });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue).join(", ");
      return res.status(409).json({
        success: false,
        message: `A vehicle with that ${field} already exists. Please use a different title.`,
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete vehicle
 * @route   DELETE /api/vehicles/:id
 * @access  Admin
 */
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Cleanup Cloudinary images
    for (const image of vehicle.images) {
      if (image.publicId) {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch (err) {
          console.error(`Failed to delete Cloudinary image: ${image.publicId}`);
        }
      }
    }

    await vehicle.deleteOne();

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Toggle featured status
 * @route   PATCH /api/vehicles/:id/featured
 * @access  Admin
 */
export const toggleFeatured = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.featured = !vehicle.featured;
    await vehicle.save();

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Toggle active status
 * @route   PATCH /api/vehicles/:id/status
 * @access  Admin
 */
export const toggleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    vehicle.isActive = !vehicle.isActive;
    await vehicle.save();

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a single image from vehicle
 * @route   DELETE /api/vehicles/:id/images/:imageIndex
 * @access  Admin
 */
export const deleteVehicleImage = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    const imageIndex = Number(req.params.imageIndex);

    if (imageIndex < 0 || imageIndex >= vehicle.images.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid image index",
      });
    }

    const image = vehicle.images[imageIndex];

    // Cleanup from Cloudinary
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (err) {
        console.error(`Failed to delete Cloudinary image: ${image.publicId}`);
      }
    }

    vehicle.images.splice(imageIndex, 1);
    await vehicle.save();

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Upload images to existing vehicle
 * @route   POST /api/vehicles/:id/images
 * @access  Admin
 */
export const uploadVehicleImages = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const newImages = await processImages(req.files);
    vehicle.images.push(...newImages);
    await vehicle.save();

    res.status(200).json({ success: true, data: vehicle });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
