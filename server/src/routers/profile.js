import express from "express";
import {getUserById, updateProfile } from "../controllers/profile";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/profile/acount",authenticate,getUserById );
router.patch("/profile/update",authenticate,updateProfile)

export default router;