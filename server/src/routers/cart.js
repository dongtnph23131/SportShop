import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";
import { addCart, getCartOfUser, removeItem, updateItem } from "../controllers/cart";

const router = express.Router();
router.post('/add-to-cart',authenticate,addCart)
router.get('/get-cart-user',authenticate,getCartOfUser)
router.patch('/remove-item-cart',authenticate,removeItem)
router.patch('/update-item-cart',authenticate,updateItem)
export default router;