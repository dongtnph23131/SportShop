import dotenv from "dotenv";
import mongoose from "mongoose";
import Customer from "../models/customer";

dotenv.config();

export const getAllUser = async (req, res) => {
  try {
    const customer = await Customer.find();

    if (!customer) {
      return res.status(401).json({
        message: "Không tìm thấy tài khoản nào",
      });
    }

    const totalCustomer = await Customer.countDocuments();
    return res.status(200).json({
      success: true,
      customer,
      totalCustomer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  console.log(req.params);
  try {
    // Kiểm tra xem id có đúng định dạng ObjectID không
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID không hợp lệ",
      });
    }

    // Tìm kiếm người dùng theo ObjectID
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản",
      });
    }

    return res.status(200).json({
      success: true,
      customer,
      message: "Lấy tài khoản thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
