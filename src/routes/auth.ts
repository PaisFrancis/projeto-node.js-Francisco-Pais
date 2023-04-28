import { Router } from "express";
import { login, profile, register } from "../actions/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", profile);

export default router;
