import express from "express"
import { requireAuth } from "../middleware/auth"
import {register, login, logout, profile} from "../controller/authController"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", requireAuth, profile);
router.post("/logout", logout)

export default router;
