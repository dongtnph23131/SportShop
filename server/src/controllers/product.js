import Product from "../models/product";
import Category from "../models/category";
import { productValidators } from "../validators/product";
import ChildProduct from "../models/childProduct";

export const getAll = async (req, res) => {
  const {
    _limit = 10,
    _sort = "createAt",
    _order = "asc",
    _page = 1,
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order == "desc" ? -1 : 1,
    },
  };
  try {
    const data = await Product.paginate({}, options);
    if (data.length == 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ChildProduct.find({ productId: id }).populate('productId','-__v').populate('colorId','-__v').populate('sizeId','-__v')
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
    const { name, description, categoryId, photoDescription } = body
    const { error } = productValidators.validate({ name, description, categoryId, photoDescription });
    if (error) {
      return res.json({
        message: error.details.map((item) => item.message),
      });
    }
    const items = body.items
    if (!body.items | body.items.length === 0) {
      return res.status(400).json({
        message: 'Cần thêm thuộc tính sản phẩm'
      })
    }
    const product = await Product.create(body)
    const itemData = items.map((item) => {
      return ChildProduct.create({ ...item, productId: product._id })
    })
    const itemProduct=await Promise.all(itemData)
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id
      }
    })
    return res.status(200).json({
      message: 'Thêm sản phẩm thành công',
      product,
      itemProduct
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      data,
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
