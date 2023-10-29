import express from "express";
import { create, get, getAll, remove, update } from "../controllers/color";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";

const router = express.Router();
router.get("/colors", getAll);
router.get("/colors/:id", get); 
router.post("/colors",authenticate,authorization, create);
router.delete("/colors/:id",authenticate,authorization, remove);
router.patch("/colors/:id",authenticate,authorization, update);

export default router;