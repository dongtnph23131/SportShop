import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";
import { createAdddress, getAdddressByAcount } from "../controllers/address";

const router = express.Router();
router.post('/address',authenticate,createAdddress)
router.get('/address/acount',authenticate,getAdddressByAcount)
export default router;
