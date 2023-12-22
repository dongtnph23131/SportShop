import Order from "../models/order";
import Product from "../models/product";
import ProductVariant from "../models/productVariant";
import { orderSchema } from "../validators/order";
import Customer from "../models/customer";
import { formatPrice, generateRandomString } from "../libs/utils";
import { sendEmail } from "./sendMail";
import User from "../models/user";
import Discount from "../models/discount";
import Gift from "../models/gift";
export const create = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const checkItems = await Promise.all(
      await body.items.map(async (element) => {
        const productVariant = await ProductVariant.findById(
          element.productVariantId
        ).populate("productId");
        return productVariant;
      })
    );
    if (checkItems.includes(null) || checkItems.includes(undefined)) {
      return res.status(400).json({
        message: "Đơn hàng có sản phẩm đã không tồn tại",
      });
    }
    const checkItemsActive = checkItems.map((item) => {
      return item.productId.status === "Active";
    });
    if (checkItemsActive.includes(false)) {
      return res.status(400).json({
        message: "Đơn hàng có sản phẩm đã không còn hoạt động",
      });
    }
    const validatedBody = orderSchema.parse(body);
    const data = await User.find({
      role: { $in: ["staff", "shipper"] },
    }).populate("orders");

    const SevenDays = 7 * 24 * 60 * 60 * 1000;

    const shippers = data
      .map((user) => user._doc)
      .filter((user) => user.role === "shipper")
      .map((user) => ({
        ...user,
        orders: user.orders.filter(
          (item) => item.createdAt.getTime() > Date.now() - SevenDays
        ),
      }))
      .sort((a, b) => a.orders.length - b.orders.length);

    const staffs = data
      .map((user) => user._doc)
      .filter((user) => user.role === "staff")
      .map((staff) => ({
        ...staff,
        orders: staff.orders.filter(
          (item) => item.createdAt.getTime() > Date.now() - SevenDays
        ),
      }))
      .sort((a, b) => a.orders.length - b.orders.length);

    if (body.giftCardId) {
      await Gift.findByIdAndUpdate(body.giftCardId, {
        isDisabled: true,
      });
    }

    let order;
    if (body.discountId) {
      const discountCheck = await Discount.findById(body.discountId);
      if (!discountCheck) {
        return res.status(400).json({
          message: "Mã giảm giá không tồn tại",
        });
      }
      order = await Order.create({
        ...validatedBody,
        managerId: staffs[0]._id,
        shipperId: shippers[0]._id,
        customerId: user._id,
        couponPrice: body.couponPrice,
        orderTotalPrice:
          validatedBody.totalPrice +
            validatedBody.shippingPrice -
            body.couponPrice >
          0
            ? validatedBody.totalPrice +
              validatedBody.shippingPrice -
              body.couponPrice
            : 0,
        code: `DH-${generateRandomString()}`,
        discountId: body.discountId,
        discountCode: discountCheck.code,
      });
      const discount = await Discount.findById(body.discountId);
      await Discount.findByIdAndUpdate(
        body.discountId,
        {
          usageLimit: discount.usageLimit + 1,
        },
        { new: true }
      );
    } else {
      order = await Order.create({
        ...validatedBody,
        managerId: staffs[0]._id,
        shipperId: shippers[0]._id,
        customerId: user._id,
        couponPrice: body.couponPrice,

        orderTotalPrice:
          validatedBody.totalPrice +
            validatedBody.shippingPrice -
            body.couponPrice >
          0
            ? validatedBody.totalPrice +
              validatedBody.shippingPrice -
              body.couponPrice
            : 0,
        code: `DH-${generateRandomString()}`,
      });
    }

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

    await User.findByIdAndUpdate(
      shippers[0]._id,
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
          <p style="color: black"><strong>Giá:</strong> ${formatPrice(
            totalPrice
          )}</p>
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
    <p style="color: black"><strong>Tổng cộng:</strong> ${formatPrice(
      order.orderTotalPrice
    )}</p>
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
      "items.productId items.productVariantId managerId discountId"
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
    order.items.forEach(async (item) => {
      const productVariant = await ProductVariant.findById(
        item.productVariantId
      );
      productVariant.inventory = productVariant.inventory + item.quantity;
      await productVariant.save();
    });
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
