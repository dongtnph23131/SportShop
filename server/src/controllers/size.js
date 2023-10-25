import Size from "../models/size";
import { sizeValidators } from "../validators/size";

export const getAll = async (req, res) => {
  try {
    const data = await Size.find()
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
    const size = await Size.findById(id)
    if (size.length === 0) {
      return res.status(200).json({
        message: "Không có màu sắc",
      });
    }
    return res.status(200).json(size);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = sizeValidators.validate(body);
    if (error) {
      return res.json({
        message: error.details.map((item) => item.message),
      });
    }
    const data = await Size.create(body);
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
    const data = await Size.findByIdAndDelete(req.params.id);
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
    const data = await Size.findOneAndUpdate(
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