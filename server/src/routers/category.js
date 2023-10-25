import express from "express";
import { create, get, getAll, remove, update } from "../controllers/category";

const router = express.Router();
router.get("/categories", getAll);
router.get("/categories/:id", get); 
router.post("/categories", create);
router.delete("/categories/:id", remove);
router.patch("/categories/:id", update);

export default router;