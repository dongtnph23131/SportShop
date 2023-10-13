import express from "express";
import { create, getAll } from "../controllers/collections";

const router = express.Router();
router.get("/collections", getAll);
// router.get("/products/:id", get); // req.params.id
router.post("/collections", create);
// router.delete("/products/:id", remove);
// router.patch("/products/:id", update);

export default router;