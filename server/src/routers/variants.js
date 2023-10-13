import express from "express";
import { create, getAll } from "../controllers/variants";

const router = express.Router();
router.get("/variants", getAll);
router.post("/variants", create);

export default router;