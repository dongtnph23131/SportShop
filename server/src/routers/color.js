import express from "express";
import { create, get, getAll, remove, update } from "../controllers/color";

const router = express.Router();
router.get("/colors", getAll);
router.get("/colors/:id", get); 
router.post("/colors", create);
router.delete("/colors/:id", remove);
router.patch("/colors/:id", update);

export default router;