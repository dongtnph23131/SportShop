import express from "express";
import { create, get, getAll, remove, update } from "../controllers/size";

const router = express.Router();
router.get("/sizes", getAll);
router.get("/sizes/:id", get); 
router.post("/sizes", create);
router.delete("/sizes/:id", remove);
router.patch("/sizes/:id", update);

export default router;