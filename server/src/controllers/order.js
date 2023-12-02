import Order from "../models/order";
import Product from "../models/product";
import ProductVariant from "../models/productVariant";
import { orderSchema } from "../validators/order";
import Customer from "../models/customer";
import { generateRandomString } from "../libs/utils";
import { sendEmail } from "./sendMail";
import User from "../models/user";
export const create = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;

    const validatedBody = orderSchema.parse(body);
    const data = await User.find({ role: "staff" });
    const staffs = data.sort((a, b) => a.orders.length - b.orders.length);
    const order = await Order.create({
      ...validatedBody,
      managerId: staffs[0]._id,
      customerId: user._id,
      orderTotalPrice:
        validatedBody.totalPrice -
        validatedBody.shippingPrice -
        `${body.couponPrice ? body.couponPrice : 0}`,
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
    await User.findByIdAndUpdate(
      staffs[0]._id,
      {
        $addToSet: {
          orders: order._id,
        },
      },
      {
        new: true,
      }
    );
    await Customer.findByIdAndUpdate(
      user._id,
      {
        $addToSet: { orderIds: order._id },
      },
      { new: true }
    );
    await cart.save({ validateBeforeSave: false });
    const emailSubject = "Xác nhận đặt hàng thành công";
    const emailContent = `Cảm ơn bạn, ${user.firstName} ${user.lastName}, đã đặt hàng! Đơn hàng của bạn đã được xác nhận thành công.`;
    const customerName = `${user.firstName} ${user.lastName}`;
    const orderHtmlContent = await generateOrderHtmlContent(order);
    await sendEmail(
      user.email,
      emailSubject,
      emailContent,
      customerName,
      orderHtmlContent
    );
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
export const generateOrderHtmlContent = async (order) => {
  const itemsHtml = await Promise.all(
    order.items.map(async (item) => {
      const productVariant = await ProductVariant.findById(
        item.productVariantId
      );
      const product = await Product.findById(item.productId);
      if (!isNaN(productVariant.price) && !isNaN(item.quantity)) {
        const totalPrice = productVariant.price * item.quantity;

        return `
        <div style="margin: 2px 0; padding: 2px;">
          <p style="color: black"><strong>Sản phẩm:</strong> ${product.name}</p>
          <p style="color: black"><strong>Biến thể:</strong> ${
            productVariant.name
          }</p>
          <p style="color: black"><strong>Số lượng:</strong> ${
            item.quantity
          }</p>
          <p style="color: black"><strong>Giá:</strong> ${totalPrice.toFixed(
            2
          )} $</p>
        </div>
        `;
      } else {
        return `<p>Không thể tính giá. Kiểm tra dữ liệu đầu vào.</p>`;
      }
    })
  );

  const orderHtmlContent = `
    <h4 style="color: black">Chi tiết đơn hàng:</h4>
    ${itemsHtml.join("")}
    <p style="color: black"><strong>Tổng cộng:</strong> ${order.orderTotalPrice.toFixed(
      2
    )} $</p>
  `;

  return orderHtmlContent;
};

export const getOrderByUser = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ customerId: user._id })
      .populate("items.productId items.productVariantId")
      .sort({ createdAt: -1 });
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
      "items.productId items.productVariantId managerId"
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
    if (order.paymentStatus === "Paid") {
      await Order.findByIdAndUpdate(id, {
        status: "Canceled",
        paymentStatus: "Refunded",
        deliveryStatus: "Canceled",
      });
    } else {
      await Order.findByIdAndUpdate(id, {
        status: "Canceled",
        paymentStatus: "Canceled",
        deliveryStatus: "Canceled",
      });
    }
    return res.status(200).json({
      message: "Hủy đơn hàng thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
