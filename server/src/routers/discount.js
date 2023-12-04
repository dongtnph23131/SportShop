import express from "express";
import { getDiscount, searchDiscount } from "../controllers/discount";
const router = express.Router();
router.get("/discounts/:code", searchDiscount);
router.get('/discounts',getDiscount)
export default router;
