import { Router } from "express";
import ProductVariant from "../../models/productVariant";
import Category from "../../models/category";
import Order from "../../models/order";

const router = Router();

router.get("/analytics", async (req, res) => {
  try {
    const productVariants = await ProductVariant.find();

    const totalPriceProductVariants = productVariants.reduce((acc, item) => {
      return item.price + acc;
    }, 0);

    return res.status(200).json({
      totalPriceProductVariants,
      totalProductVariants: productVariants.length,
      totalOutOfStockProductVariants: productVariants.filter(
        (item) => item.inventory === 0
      ).length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      _limit = 10,
      _sort = "createdAt",
      _page = 1,
      _order = "desc",
      _status = "all",
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

    let searchQuery = {
      ...(q
        ? {
            $or: [
              { name: { $regex: q, $options: "i" } },
              //search by product name that is retrieved from productId in MongoDB
              { "productId.name": { $regex: q, $options: "i" } },
            ],
          }
        : {}),
      ...(_status === "in-stock" && _status ? { inventory: { $gt: 0 } } : {}),
      ...(_status === "out-of-stock" && _status
        ? { inventory: { $eq: 0 } }
        : {}),
    };

    const productVariants = await ProductVariant.paginate(searchQuery, options);
    const categories = await Category.find();
    const orders = await Order.find({ status: "Pending" });

    let newProductVariants = productVariants.docs.map((productVariant) => {
      const category = categories.find((category) => {
        return (
          category._id.toString() ===
          productVariant.productId.categoryId.toString()
        );
      });

      return {
        ...productVariant._doc,
        category,
        pendingOrders: orders.filter((order) => {
          return order.items.some((item) => {
            return (
              item.productVariantId.toString() === productVariant._id.toString()
            );
          });
        }),
      };
    });

    if (_status === "ordered") {
      const allProductVariants = (
        await ProductVariant.find().populate("productId")
      )
        .map((item) => item._doc)
        .map((productVariant) => {
          const category = categories.find((category) => {
            return (
              category._id.toString() ===
              productVariant.productId.categoryId.toString()
            );
          });

          return {
            ...productVariant,
            category,
            pendingOrders: orders.filter((order) => {
              return order.items.some((item) => {
                return (
                  item.productVariantId.toString() ===
                  productVariant._id.toString()
                );
              });
            }),
          };
        });

      newProductVariants = allProductVariants.filter(
        (productVariant) => productVariant.pendingOrders.length > 0
      );
    }

    return res.status(200).json({
      ...productVariants,
      docs: newProductVariants,
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
