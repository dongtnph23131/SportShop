import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", create);
router.delete("/products/:id", remove);
router.put("/products/:id", update);

export default router;
