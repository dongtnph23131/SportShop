import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  addCart,
  getCartOfUser,
  removeCart,
  removeItem,
  removeItemCart,
  updateItem,
} from "../controllers/cart";

const router = express.Router();
router.post("/add-to-cart", authenticate, addCart);
router.get("/get-cart-user", authenticate, getCartOfUser);
router.patch("/remove-item-cart", authenticate, removeItem);
router.patch("/update-item-cart", authenticate, updateItem);
router.patch("/remove-item", authenticate, removeItemCart);
router.patch("/remove-cart",authenticate,removeCart)
export default router;
