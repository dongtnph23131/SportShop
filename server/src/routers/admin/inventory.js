import { Router } from "express";
import ProductVariant from "../../models/productVariant";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const productVariants = await ProductVariant.find().populate("productId");

    return res.status(200).json(productVariants);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productVariant = await ProductVariant.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    return res.status(200).json(productVariant);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const inventoryRoutes = router;
