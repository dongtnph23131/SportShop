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
    const address = await Address.create({ ...body, customerId: user._id });
    if (body.default && body.default === true) {
      await Address.findAndUpdate(
        { default: true },
        {
          default: false,
        },
        {
          new: true,
        }
      );
    }
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
