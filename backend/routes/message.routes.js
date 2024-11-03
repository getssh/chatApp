import { Router } from "express";
import {sendMessage} from '../controllers/message.controller.js'
import protect from "../middlewares/protect.js";

const router = Router();

router.post("/send/:id", protect, sendMessage)

export default router;