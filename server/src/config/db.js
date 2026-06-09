import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Disable command buffering so queries fail fast when not connected
    mongoose.set("bufferCommands", false);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    // Re-enable buffering after successful connection
    mongoose.set("bufferCommands", true);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    console.error("⚠️  Server will continue running without database. API calls requiring DB will fail.");
    console.error("💡 Make sure your IP is whitelisted in MongoDB Atlas.");
  }
};

export default connectDB;
