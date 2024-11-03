import { Router } from "express";
import {sendMessage, getMessage} from '../controllers/message.controller.js'
import protect from "../middlewares/protect.js";

const router = Router();

router.get("/:id", protect, getMessage)
router.post("/send/:id", protect, sendMessage)

export default router;