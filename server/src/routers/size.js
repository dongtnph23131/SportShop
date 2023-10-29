import express from "express";
import { create, get, getAll, remove, update } from "../controllers/size";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";

const router = express.Router();
router.get("/sizes", getAll);
router.get("/sizes/:id", get); 
router.post("/sizes",authenticate,authorization, create);
router.delete("/sizes/:id",authenticate,authorization, remove);
router.patch("/sizes/:id",authenticate,authorization, update);

export default router;