import express from "express";
import { forgotPassword, resetPassword } from "../controllers/acount";
const router = express.Router();
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword);
export default router;
