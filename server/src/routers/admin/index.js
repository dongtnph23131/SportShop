import { Router } from "express";
import { productRoutes } from "./product";
import { categoryRoutes } from "./category";
import { orderRoutes } from "./order";
import { customerRoutes } from "./customer";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);

export const adminRoutes = router;
