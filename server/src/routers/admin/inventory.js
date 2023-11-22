import { Router } from "express";
import ProductVariant from "../../models/productVariant";
import Category from "../../models/category";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {
      _limit = 10,
      _sort = "createAt",
      _page = 1,
      _order = "asc",
      q,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      populate: [{ path: "productId" }],
    };

    let searchQuery = q
      ? {
          name: { $regex: q, $options: "i" },
        }
      : {};

    const productVariants = await ProductVariant.paginate(searchQuery, options);
    const categories = await Category.find();

    return res.status(200).json({
      ...productVariants,
      docs: productVariants.docs.map((productVariant) => {
        const category = categories.find((category) => {
          return (
            category._id.toString() ===
            productVariant.productId.categoryId.toString()
          );
        });

        return {
          ...productVariant._doc,
          category,
        };
      }),
    });
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
