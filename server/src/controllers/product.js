import Product from "../models/product";
import Category from "../models/category";
import { productCreateBodySchema } from "../validators/product";
import ProductVariant from "../models/productVariant";

export const getAll = async (req, res) => {
  try {
    const {
      _limit = 100,
      _sort = "createdAt",
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
      populate: [{ path: "categoryId", select: "name" }],
    };
    let searchQuery = q
      ? {
          name: { $regex: q, $options: "i" },
          status: "Active",
        }
      : { status: "Active" };
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
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id).populate(
      "productVariantIds",
      "-__v"
    );

    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có sản phẩm",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { name, description, categoryId, options, variants, images } =
      productCreateBodySchema.parse(body);
    const numberPrice = variants.map((variant) => {
      return variant.price;
    });
    const minPrice = Math.min(...numberPrice);
    const maxPrice = Math.max(...numberPrice);
    const product = await Product.create({
      name,
      description,
      categoryId,
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
        products: product._id,
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
};

export const remove = async (req, res) => {
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
};

export const update = async (req, res) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
