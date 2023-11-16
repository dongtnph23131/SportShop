import dotenv from "dotenv";
import Customer from "../models/customer";

dotenv.config();

export const getUserById = async (req, res) => {
  try {
    const user = req.user;
    const customer = await Customer.findById(user._id);

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
export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const customer = await Customer.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      customer,
      message: "Cập nhập tài khoản thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
