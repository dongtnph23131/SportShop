import Order from "../models/order";
import Product from "../models/product";
import ProductVariant from "../models/productVariant";
import { orderSchema } from "../validators/order";

export const create = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const {
      fullName,
      email,
      phone,
      address,
      shippingPrice,
      totalPrice,
      typePayment,
      items,
    } = orderSchema.parse(body);
    const order = await Order.create({ ...body, customerId: user._id });
    return res.status(200).json({
      message: "Đặt hàng thành công",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOrderByUser = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ customerId: user._id }).populate(
      "items.productId items.productVariantId"
    );
    return res.status(200).json({
      message: "Lấy đơn hàng của tài khoản thành công",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId items.productVariantId"
    );
    return res.status(200).json({
      message: "Lấy đơn hàng thành công",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
