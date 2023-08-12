import express from "express";
import { Router } from "express";
import protect from "../middleware/authMiddleware";
import {
  fetchAllMessages,
  sendMessage,
} from "../controllers/messageController";

const router: Router = express.Router();

router.get("/:chatId", protect, fetchAllMessages);

router.post("/", protect, sendMessage);

export default router;
