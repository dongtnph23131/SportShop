import express from "express";
import { searchDiscount } from "../controllers/discount";
const router = express.Router();
router.get("/discounts/:code", searchDiscount);
export default router;
