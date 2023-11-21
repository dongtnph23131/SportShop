import express from "express";
import { create, getAllCommentByProduct } from "../controllers/comment";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/comments",authenticate, create);
router.get("/comments/:productId",getAllCommentByProduct)
export default router;
