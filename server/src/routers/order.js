import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { create } from "../controllers/order";

const router = express.Router();
router.post('/orders',authenticate,create)

export default router;
