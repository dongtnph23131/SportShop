import { Router } from "express";
import { productRoutes } from "./product";
import { categoryRoutes } from "./category";
import { orderRoutes } from "./order";
import { customerRoutes } from "./customer";
import { authRoutes } from "./auth";
import { verifyToken } from "../../middlewares/admin";

const router = Router();

router.use("/categories", verifyToken, categoryRoutes);
router.use("/products", verifyToken, productRoutes);
router.use("/orders", verifyToken, orderRoutes);
router.use("/customers", verifyToken, customerRoutes);
router.use("/auth", authRoutes);

export const adminRoutes = router;
