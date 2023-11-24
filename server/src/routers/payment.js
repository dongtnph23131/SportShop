
import express from 'express';
import { MomoSuccess, PayMomo } from '../controllers/payment.js';
const routerPayment = express.Router();

routerPayment.post("/create_momo", PayMomo);
routerPayment.get('/momo',MomoSuccess)
export default routerPayment;
