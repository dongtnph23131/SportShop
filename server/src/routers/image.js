import express from "express";
import { create, getAll } from "../controllers/image";

const router = express.Router();
router.get("/image", getAll);
router.post("/image", create);

export default router;