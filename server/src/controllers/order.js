import Order from "../models/order";
import Product from "../models/product";
import ProductVariant from "../models/productVariant";
import CartItem from "../models/cartItem";
import { orderSchema } from "../validators/order";
import Cart from "../models/cart";
import Customer from "../models/customer";

export const create = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;

    const validatedBody = orderSchema.parse(body);

    const order = await Order.create({
      ...validatedBody,
      customerId: user._id,
      orderTotalPrice: validatedBody.totalPrice - validatedBody.shippingPrice,
    });

    await Customer.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { orderIds: order._id },
      },
      { new: true }
    );

    await CartItem.deleteMany({
      customerId: user._id,
    });

    const cart = await Cart.findOne({ customerId: user._id });
    cart.items = [];
    await cart.save({ validateBeforeSave: false });
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
