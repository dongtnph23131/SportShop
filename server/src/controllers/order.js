import Order from "../models/order";
import Product from "../models/product";
import ProductVariant from "../models/productVariant";
import CartItem from "../models/cartItem";
import { orderSchema } from "../validators/order";
import Cart from "../models/cart";
import Customer from "../models/customer";
import { generateRandomString } from "../libs/utils";

export const create = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;

    const validatedBody = orderSchema.parse(body);

    const order = await Order.create({
      ...validatedBody,
      customerId: user._id,
      orderTotalPrice: validatedBody.totalPrice - validatedBody.shippingPrice,
      code: `DH-${generateRandomString()}`,
    });
    await Promise.all(
      validatedBody.items.map(async (item) => {
        const productVariant = await ProductVariant.findById(
          item.productVariantId
        );
        await ProductVariant.findByIdAndUpdate(
          productVariant._id,
          {
            inventory: productVariant.inventory - item.quantity,
          },
          { new: true }
        );
        const product = await Product.findById(item.productId);
        await Product.findByIdAndUpdate(
          item.productId,
          { purchases: product.purchases + item.quantity },
          { new: true }
        );
      })
    );
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
export const cancelOrderByAcount = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const order = await Order.findOne({ _id: id, customerId: user._id });
    if (!order) {
      return res.status(500).json({
        message: "Bạn k có quyền hủy đơn hàng này",
      });
    }
    if (order.status === "Completed" || order.deliveryStatus === "Shipping") {
      return res.status(500).json({
        message: "Bạn k thể hủy đơn",
      });
    }
    await Order.findByIdAndUpdate(id, {
      status: "Canceled",
      paymentStatus: "Canceled",
      deliveryStatus: "Canceled",
    });
    return res.status(200).json({
      message: "Hủy đơn hàng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
