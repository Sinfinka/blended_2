import express from "express";
import { getUser, register } from "../controllers/authController.js";
import { auth } from "../helpers/auth.js";

const router = express.Router();

router.get("/", auth, getUser);

router.post("/register", register);

export default router;
