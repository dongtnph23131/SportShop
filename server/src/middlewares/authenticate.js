import Customer from "../models/customer";
import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(203).json({
        message: "Bạn cần đăng nhập !",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, "dongtimo");
    const user = await Customer.findById(id);
    if (!user) {
      return res.status(203).json({
        message: "Không tìm thấy người dùng",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(203).json({
      message: error.message,
    });
  }
};
