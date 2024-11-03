import { Router } from "express";
import protect from "../middlewares/protect.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = Router();

router.get('/', protect, getUsersForSidebar)

export default router;