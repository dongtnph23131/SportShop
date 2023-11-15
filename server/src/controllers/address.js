import Address from "../models/address";
import Customer from "../models/customer";
import { addressValidators } from "../validators/address";

export const createAdddress = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const { error } = addressValidators.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    if (body.default && body.default === true) {
      await Address.findOneAndUpdate(
        { default: true },
        {
          default: false,
        },
        {
          new: true,
        }
      );
    }
    const address = await Address.create({ ...body, customerId: user._id });
    await Customer.findByIdAndUpdate(
      user._id,
      {
        $addToSet: {
          addressIds: address._id,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: "Lưu địa chỉ thành công",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getAdddressByAcount = async (req, res) => {
  try {
    const user = req.user;
    const address = await Address.find({
      customerId: user._id,
    });
    return res.status(200).json({
      message: "Lấy địa chỉ thành công",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const removeAddressByAcount = async (req, res) => {
  try {
    const user = req.user;
    await Address.findByIdAndDelete(req.params.id);
    await Customer.findByIdAndUpdate(user._id, {
      $pull: {
        addressIds: req.params.id,
      },
    });
    return res.status(200).json({
      message: "Xóa địa chỉ thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOneAddressByAcount = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    return res.status(200).json({
      message: "Lấy địa chỉ thành công",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateAddressByAcount = async (req, res) => {
  try {
    const body=req.body
    if (body.default && body.default === true) {
      await Address.findOneAndUpdate(
        { default: true },
        {
          default: false,
        },
        {
          new: true,
        }
      );
    }
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Cập nhập địa chỉ thành công",
      address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
