import express from "express";

import {
  signup,
  login,
  getMe,
} from "../controllers/authController.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Current logged-in user
router.get("/me", verifyToken, getMe);

export default router;