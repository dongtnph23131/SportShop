import { Router } from "express";
import { productRoutes } from "./product";
import { categoryRoutes } from "./category";
import { orderRoutes } from "./order";
import { customerRoutes } from "./customer";
import { authRoutes } from "./auth";
import { analyticRoutes } from "./analytics";
import { verifyToken } from "../../middlewares/admin";
import { inventoryRoutes } from "./inventory";
import { userRoutes } from "./user";
import User from "../../models/user";

const router = Router();

router.use("/categories", verifyToken, categoryRoutes);
router.use("/products", verifyToken, productRoutes);
router.use("/orders", verifyToken, orderRoutes);
router.use("/customers", verifyToken, customerRoutes);
router.use("/analytics", verifyToken, analyticRoutes);
router.use("/inventory", verifyToken, inventoryRoutes);
router.use("/user", verifyToken, userRoutes);
router.use("/auth", authRoutes);
router.use("/me", verifyToken, async (req, res) => {
  if (!req.user) return res.status(401).json("You need to login!");

  const user = await User.findById(req.user.id);

  res.status(200).json(user);
});

export const adminRoutes = router;
