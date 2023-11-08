import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { create, getOneOrder, getOrderByUser } from "../controllers/order";

const router = express.Router();
router.post("/orders", authenticate, create);
router.get("/orders-by-user", authenticate, getOrderByUser);
router.get('/orders/:id',getOneOrder)
export default router;
