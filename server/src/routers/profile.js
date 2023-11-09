import express from "express";
import { getAllUser, getUserById } from "../controllers/profile";

const router = express.Router();

// Define routes
router.get("/profile",getAllUser );
router.get("/profile/:customerI",getUserById );


export default router;