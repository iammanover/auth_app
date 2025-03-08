import express from "express";
import connectDB from "./config/db.js";
import corsMiddleware from "./middleware/corsMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/ProtectedRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

// Connect to MongoDB
connectDB();

export default app;
