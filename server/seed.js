import "dotenv/config";
import mongoose from "mongoose";
import Admin from "./src/models/Admin.js";

const ADMIN_NAME = "BlackPiston Admin";
const ADMIN_EMAIL = "admin@blackpiston.com";
const ADMIN_PASSWORD = "BlackPiston2025!";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await Admin.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      console.log(`ℹ️  Admin already exists: ${ADMIN_EMAIL}`);
    } else {
      await Admin.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
      console.log(`✅ Admin created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
    }

    await mongoose.disconnect();
    console.log("✅ Done — disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();
