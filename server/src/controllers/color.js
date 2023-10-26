import Color from "../models/color";
import { colorValidators } from "../validators/color";

export const getAll = async (req, res) => {
  try {
    const data = await Color.find().populate("products")
    if (data.length == 0) {
      return res.json({
        message: "Không có màu sắc",
      });
    }
    return res.json(data);
  } catch (error) {}
};
export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const color = await Color.findById(id).populate("products")
    if (color.length === 0) {
      return res.status(200).json({
        message: "Không có màu sắc",
      });
    }
    return res.status(200).json(color);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = colorValidators.validate(body);
    if (error) {
      return res.json({
        message: error.details.map((item) => item.message),
      });
    }
    const data = await Color.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        message: "Thêm màu sắc thất bại",
      });
    }
    return res.status(200).json({
      message: "Thêm màu sắc thành công",
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
    const data = await Color.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa màu sắc thành công",
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
    const data = await Color.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!data) {
      return res.status(400).json({
        message: "Cập nhật màu sắc thất bại",
      });
    }
    return res.json({
      message: "Cập nhật màu sắc thành công",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};