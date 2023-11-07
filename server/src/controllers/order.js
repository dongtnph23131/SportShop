import Order from "../models/order";
import { orderSchema } from "../validators/order";

export const create = async (req, res) => {
  try {
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
    const order = await Order.create(body);
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
