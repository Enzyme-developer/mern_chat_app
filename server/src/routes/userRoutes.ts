import express from "express";
import { Router } from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", protect, getAllUsers);

export default router;
