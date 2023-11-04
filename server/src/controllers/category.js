import Category from "../models/category";
import { categoryValidators } from "../validators/category";

export const getAll = async (req, res) => {
  try {
    const data = await Category.find().populate("productIds")
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
    const id = req.params.id;
    const category = await Category.findById(id).populate("products")
    if (category.length === 0) {
      return res.status(200).json({
        message: "Không có danh mục",
      });
    }
    return res.status(200).json(category);
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