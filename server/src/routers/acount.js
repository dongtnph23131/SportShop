import express from "express";
import { forgotPassword, resetPassword, updatePassword } from "../controllers/acount";
import {authenticate} from '../middlewares/authenticate'
const router = express.Router();
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword", resetPassword);
router.patch('/updatePassword',authenticate,updatePassword)
export default router;
