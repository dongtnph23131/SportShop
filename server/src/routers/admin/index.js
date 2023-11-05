import { Router } from "express";
import { productRoutes } from "./product";
import { categoryRoutes } from "./category";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

export const adminRoutes = router;
