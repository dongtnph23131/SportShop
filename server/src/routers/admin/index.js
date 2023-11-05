import { Router } from "express";
import { productRoutes } from "./product";

const router = Router();

router.use("/products", productRoutes);

export const adminRoutes = router;
