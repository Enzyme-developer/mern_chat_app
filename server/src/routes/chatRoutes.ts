import express from "express";
import {
  fetchChat,
  fetchAllChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} from "../controllers/chatController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.post("/fetch", protect, fetchChat);

router.get("/fetchAll", protect, fetchAllChats);

router.post("/group/create", protect, createGroupChat);

router.put("/group/rename", protect, renameGroup);

router.put("/group/remove", protect, removeFromGroup);

router.put("/group/add", protect, addToGroup);

export default router;
