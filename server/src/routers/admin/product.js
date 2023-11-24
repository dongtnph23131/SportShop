import { Router } from "express";
import Product from "../../models/product";
import ProductVariant from "../../models/productVariant";
import Category from "../../models/category";
import {
  productCreateBodySchema,
  productUpdateBodySchema,
} from "../../validators/product";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {
      _limit = 100,
      _sort = "createAt",
      _page = 1,
      _order = "asc",
      categories,
      q,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      populate: [{ path: "categoryId" }, { path: "productVariantIds" }],
    };
    let searchQuery = q
      ? {
          name: { $regex: q, $options: "i" },
        }
      : {};
    if (categories) {
      searchQuery = {
        ...searchQuery,
        categoryId: {
          $in: categories.split("."),
        },
      };
    }

    const data = await Product.paginate(searchQuery, options);

    return res.status(200).json(data.docs);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate([
      "productVariantIds",
      "categoryId",
    ]);

    if (!product) {
      return res.status(200).json({
        message: "Không có sản phẩm",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      slug,
      name,
      description,
      categoryId,
      productCode,
      options,
      variants,
      images,
    } = productCreateBodySchema.parse(req.body);
    const numberPrice = variants.map((variant) => {
      return variant.price;
    });
    const minPrice = Math.min(...numberPrice);
    const maxPrice = Math.max(...numberPrice);
    const product = await Product.create({
      slug,
      name,
      description,
      categoryId,
      code: productCode,
      options,
      images,
    });
    await Product.findByIdAndUpdate(
      product._id,
      {
        minPrice,
        maxPrice,
      },
      {
        new: true,
      }
    );
    const productVariants = await Promise.all(
      variants.map((variant) => {
        return ProductVariant.create({
          name: variant.name,
          price: variant.price,
          inventory: variant.inventory,
          options: variant.options,
          sku: variant.sku,
          productId: product._id,
        });
      })
    );

    const productVariantIds = productVariants.map((item) => item._id);

    const newProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        productVariantIds: productVariantIds,
      },
      {
        new: true,
      }
    );
    await newProduct.save({ validateBeforeSave: false });

    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        productIds: product._id,
      },
    });

    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
      product: newProduct,
      productVariants,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    await ProductVariant.deleteMany({
      productId: req.params.id,
    });

    return res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      slug,
      name,
      description,
      productCode,
      categoryId,
      options,
      images,
      variants,
    } = productUpdateBodySchema.parse(req.body);

    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        slug,
        name,
        description,
        code: productCode,
        categoryId,
        options,
        images,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }

    for (const variant of variants) {
      await ProductVariant.findOneAndUpdate(
        { _id: variant.id },
        {
          name: variant.name,
          sku: variant.sku,
          price: variant.price,
          inventory: variant.inventory,
          options: variant.options,
        },
        {
          new: true,
        }
      );
    }

    return res.json({
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

export const productRoutes = router;
