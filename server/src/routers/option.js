import express from "express";
import { create, getAll } from "../controllers/option";

const router = express.Router();
router.get("/option", getAll);
router.post("/option", create);

export default router;