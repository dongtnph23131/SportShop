import { Router } from "express";
import ProductVariant from "../../models/productVariant";
import nodemailer from "nodemailer";
import Order from "../../models/order";
import { generateInvoice } from "../../libs/generate-invoice";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {
      _limit = 10,
      _sort = "createdAt",
      _page = 1,
      _order = "desc",
      q,
      status,
      from,
      to,
    } = req.query;

    const formDay = from ? new Date(from) : undefined;

    //subtract 7 hours because of timezone
    const toDay = to
      ? new Date(new Date(to).setDate(new Date(to).getDate() + 1)).setHours(
          new Date(to).getHours() - 7
        )
      : undefined;

    const role = req.user.role;

    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
      populate: [{ path: "managerId" }],
    };

    let searchQuery = {
      ...(q
        ? {
            $or: [
              { code: { $regex: q, $options: "i" } },
              { phone: { $regex: q, $options: "i" } },
              { fullName: { $regex: q, $options: "i" } },
            ],
          }
        : {}),
      ...(status !== "all" && status ? { status: status } : {}),
      ...(formDay || toDay
        ? {
            createdAt: {
              ...(formDay && { $gte: formDay }),
              ...(toDay && { $lte: toDay }),
            },
          }
        : {}),
      ...(role === "staff" ? { managerId: req.user.id } : {}),
      ...(role === "shipper" ? { shipperId: req.user.id } : {}),
    };

    const orders = await Order.paginate(searchQuery, options);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/statistic", async (req, res) => {
  try {
    const { from, to } = req.query;

    const formDay = from ? new Date(from) : undefined;

    //subtract 7 hours because of timezone
    const toDay = to
      ? new Date(new Date(to).setDate(new Date(to).getDate() + 1)).setHours(
          new Date(to).getHours() - 7
        )
      : undefined;

    const totalCanceled = await Order.countDocuments({})
      .where({
        status: "Canceled",
        ...(formDay || toDay
          ? {
              createdAt: {
                ...(formDay && { $gte: formDay }),
                ...(toDay && { $lte: toDay }),
              },
            }
          : {}),
      })
      .count();

    const totalCompleted = await Order.countDocuments({})
      .where({
        status: "Completed",
        ...(formDay || toDay
          ? {
              createdAt: {
                ...(formDay && { $gte: formDay }),
                ...(toDay && { $lte: toDay }),
              },
            }
          : {}),
      })
      .count();

    const totalPending = await Order.countDocuments({})
      .where({
        status: "Pending",
        ...(formDay || toDay
          ? {
              createdAt: {
                ...(formDay && { $gte: formDay }),
                ...(toDay && { $lte: toDay }),
              },
            }
          : {}),
      })
      .count();

    const total = await Order.countDocuments({})
      .where({
        ...(formDay || toDay
          ? {
              createdAt: {
                ...(formDay && { $gte: formDay }),
                ...(toDay && { $lte: toDay }),
              },
            }
          : {}),
      })
      .count();

    return res
      .status(200)
      .json({ totalCanceled, totalCompleted, totalPending, total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const role = req.user.role;

    const options = {
      ...(role === "staff" ? { managerId: req.user.id } : {}),
      ...(role === "shipper" ? { shipperId: req.user.id } : {}),
    };

    const orders = await Order.find(options);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId items.productVariantId managerId shipperId"
    );
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id/invoice", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId items.productVariantId"
    );
    const doc = generateInvoice(order);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");
    doc.pipe(res);

    doc.end();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:id/invoice/send-email", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId items.productVariantId"
    );

    const htmlContent = `
    <div style="display: flex; justify-content: center; color: black;">
    <div style="color: black; margin: auto;">
      <img src="https://i.imgur.com/QKplh0e.jpg" alt="Logo" style="max-width: 250px; max-height: 250px; margin: auto; display: block;">
      <h3 style="color: black;">Hi ${order.fullName},</h3>
      <p style="color: black;">Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được ghi nhận.</p>
      <p style="color: black;">Cửa hàng gửi bạn hóa đơn cho đơn hàng ${order.code}.</p>
      <p style="color: black;">Vui lòng tìm hóa đơn được đính kèm ở email.</p>
      <p style="color: black;">Xin cảm ơn!</p>
      <p style="color: black;">Sport shop,</p>
    </div>
    </div>
    `;

    const doc = generateInvoice(order);

    let buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      let pdfData = Buffer.concat(buffers);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tranngocdong2042003@gmail.com",
          pass: process.env.PasswordMail,
        },
      });

      let mailOptions = {
        from: "tranngocdong2042003@gmail.com",
        to: order.email,
        subject: "Sport Shop - Hóa đơn đơn hàng của bạn",
        html: htmlContent,
        attachments: [
          {
            filename: "invoice.pdf",
            content: pdfData,
          },
        ],
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: error });
        } else {
          console.log(`Email sent to ${order.email}: ` + info.response);
          res.status(200).json({ message: "Email sent successfully." });
        }
      });
    });

    doc.end();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:id/pay", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).end("Missing id");
    }

    const order = await Order.findById(id);

    if (order.status === "Canceled" || order.paymentStatus === "Canceled") {
      return res.status(500).end("This order was canceled!");
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      paymentStatus: "Paid",
    });

    if (order.deliveryStatus === "Shipped") {
      await Order.findByIdAndUpdate(id, {
        status: "Completed",
      });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:id/ship/status", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const order = await Order.findById(id);

    if (order.status === "Canceled" || order.paymentStatus === "Canceled") {
      return res.status(500).end("This order was canceled!");
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      deliveryStatus: status,
    });

    if (order.paymentStatus === "Paid") {
      await Order.findByIdAndUpdate(id, {
        status: "Completed",
      });
    }

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/:id/cancel", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).end("Missing id");
    }

    const order = await Order.findById(id).populate(
      "items items.productVariantId"
    );

    //Cập nhật lại số lượng sản phẩm khi hủy đơn hàng
    for (const item of order.items) {
      await ProductVariant.findByIdAndUpdate(item.productVariantId._id, {
        inventory: item.quantity + item.productVariantId.inventory,
      });
    }

    if (order.status === "Completed") {
      return res
        .status(500)
        .end("Can not cancel this order that was completed.!");
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      status: "Canceled",
      paymentStatus: "Canceled",
      deliveryStatus: "Canceled",
    });

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/ship", async (req, res) => {
  try {
    const { id } = req.params;
    const { shipperId } = req.body;

    if (!id) {
      return res.status(400).end("Missing id");
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      shipperId: shipperId,
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id/refuse-ship", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).end("Missing id");
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      shipperId: null,
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).end("Missing id");
    }

    const order = await Order.findByIdAndDelete(id);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const orderRoutes = router;
