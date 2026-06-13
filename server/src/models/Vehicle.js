import mongoose from "mongoose";
import slugify from "slugify";

const vehicleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vehicle title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["car", "bike"],
        message: "Category must be either car or bike",
      },
    },
    type: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: {
        values: ["Coupe", "Sedan", "SUV", "Sport", "Cruiser", "Adventure"],
        message: "Invalid vehicle type",
      },
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
      index: true,
    },
    model: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [1900, "Year must be after 1900"],
      max: [2100, "Year must be before 2100"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      index: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
      default: "Petrol",
    },
    transmission: {
      type: String,
      enum: ["Automatic", "Manual"],
      default: "Automatic",
    },
    mileage: {
      type: Number,
      default: 0,
      min: 0,
    },
    power: {
      type: String,
      trim: true,
      default: "",
    },
    topSpeed: {
      type: String,
      trim: true,
      default: "",
    },
    acceleration: {
      type: String,
      trim: true,
      default: "",
    },
    color: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    tagline: {
      type: String,
      trim: true,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: "" },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate unique slug from title before saving
vehicleSchema.pre("save", async function () {
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const existing = await mongoose.model("Vehicle").findOne({
        slug,
        _id: { $ne: this._id }, // exclude self when updating
      });
      if (!existing) break;
      slug = `${baseSlug}-${++counter}`;
    }

    this.slug = slug;
  }
});


// Compound index for common queries
vehicleSchema.index({ isActive: 1, featured: -1, createdAt: -1 });
vehicleSchema.index({ isActive: 1, category: 1 });
vehicleSchema.index({ isActive: 1, brand: 1 });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
