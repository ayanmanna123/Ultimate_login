import express from "express";
import { getalluser, updateUser } from "../controllers/user.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.put("/update", isAuthenticated, updateUser);
router.get("/get", isAuthenticated,getalluser);

export default router;
