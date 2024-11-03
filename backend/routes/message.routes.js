import { Router } from "express";

const router = Router();

router.post("/send/:id", sendMessage)

export default router;