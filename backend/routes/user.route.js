import express from "express";
import { updateUser } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.put("/update", isAuthenticated, updateUser);
router.put("/save", updateUser);

export default router;
