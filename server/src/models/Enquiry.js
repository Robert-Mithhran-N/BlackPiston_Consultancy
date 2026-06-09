import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      default: null,
    },
    vehicleName: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Test drive", "Negotiation", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

// Sort newest first by default
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ status: 1 });

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
