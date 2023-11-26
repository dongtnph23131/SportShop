import express from "express";
import { create, get, getAll, getDetail, remove, update } from "../controllers/category";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authorization";

const router = express.Router();
router.get("/categories", getAll);
router.get("/categories/:id", get);
router.post("/categories", create);
router.delete("/categories/:id", remove);
router.patch("/categories/:id", update);
router.get("/categories/detail/:id",getDetail)
export default router;
