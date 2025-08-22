import express from "express";
import { saveUser, updateUser } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Save (create user if not exists) → should be POST and protected
router.post("/save", isAuthenticated, saveUser);

// Update existing user → PUT and protected
router.put("/update", isAuthenticated, updateUser);

export default router;
