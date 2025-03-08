import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Dashboard from "../controllers/dashboardController.js";

const router = express.Router();

// Protected route
router.get("/dashboard", authMiddleware, Dashboard);

export default router;
