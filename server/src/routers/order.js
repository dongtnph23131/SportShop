import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  cancelOrderByAcount,
  create,
  getOneOrder,
  getOrderByUser,
} from "../controllers/order";

const router = express.Router();
router.post("/orders", authenticate, create);
router.get("/orders-by-user", authenticate, getOrderByUser);
router.get("/orders/:id", getOneOrder);
router.patch("/orders/:id/cancel", authenticate, cancelOrderByAcount);
export default router;
