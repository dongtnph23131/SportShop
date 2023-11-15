import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";
import { createAdddress, getAdddressByAcount, getOneAddressByAcount, removeAddressByAcount, updateAddressByAcount } from "../controllers/address";

const router = express.Router();
router.post('/address',authenticate,createAdddress)
router.get('/address/acount',authenticate,getAdddressByAcount)
router.delete('/address/:id/acount',authenticate,removeAddressByAcount)
router.get('/address/:id/acount',authenticate,getOneAddressByAcount)
router.patch('/address/:id/acount',authenticate,updateAddressByAcount)
export default router;
