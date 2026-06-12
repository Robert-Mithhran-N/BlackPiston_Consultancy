import "dotenv/config";
import mongoose from "mongoose";
import Admin from "./src/models/Admin.js";

const ADMIN_NAME = "BlackPiston Admin";
const ADMIN_EMAIL = "blackpistonconsultancy@gmail.com";
const ADMIN_PASSWORD = "Robert@2510.";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clean up default admin for security
    await Admin.deleteOne({ email: "admin@blackpiston.com" });
    console.log("🧹 Removed default admin account if existed");

    const existing = await Admin.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      existing.password = ADMIN_PASSWORD;
      existing.name = ADMIN_NAME;
      await existing.save();
      console.log(`✅ Admin updated: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
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
