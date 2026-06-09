import "dotenv/config";
import mongoose from "mongoose";

console.log("URI exists:", !!process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  });
