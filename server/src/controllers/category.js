import Category from "../models/category";
import Product from "../models/product";
import { categoryValidators } from "../validators/category";

export const getAll = async (req, res) => {
  try {
    const data = await Category.find().populate("productIds");
    if (data.length == 0) {
      return res.json({
        message: "Không có danh mục",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const {
      _limit = 100,
      _page = 1,
      _sort = "createAt",
      _order = "asc",
    } = req.query;
    const options = {
      limit: _limit,
      page: _page,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      populate: [{ path: "categoryId" }],
    };
    const data = await Product.paginate({ categoryId: categoryId,status:'Active' }, options);
    return res.status(200).json(data.docs);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = categoryValidators.validate(body);
    if (error) {
      return res.json({
        message: error.details.map((item) => item.message),
      });
    }
    const data = await Category.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Thêm danh mục thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm danh mục thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa danh mục thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const update = async (req, res) => {
  try {
    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({
        message: "Cập nhật danh mục thất bại",
      });
    }
    return res.json({
      message: "Cập nhật danh mục thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).populate('productIds');
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
