import express from "express";
import { getUser, register } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getUser);

router.post("/register", register);

export default router;
