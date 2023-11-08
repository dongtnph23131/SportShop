import Customer from "../models/customer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinValidators, signupValidators } from "../validators/auth";
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { error } = signupValidators.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const userExist = await Customer.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Customer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    user.password = undefined;

    return res.status(201).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinValidators.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const user = await Customer.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }
    const token = jwt.sign({ id: user._id }, "dongtimo", {
      expiresIn: "365d",
    });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
