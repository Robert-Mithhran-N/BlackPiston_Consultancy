import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BlackPiston Consultancy API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
