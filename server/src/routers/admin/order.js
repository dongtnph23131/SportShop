import { Router } from "express";
import Order from "../../models/order";

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
    const totalCanceled = await Order.countDocuments({})
      .where({
        status: "Canceled",
      })
      .count();

    const totalCompleted = await Order.countDocuments({})
      .where({
        status: "Completed",
      })
      .count();

    const total = await Order.countDocuments({});

    return res.status(200).json({ totalCanceled, totalCompleted, total });
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
      "items.productId items.productVariantId customerId managerId shipperId"
    );
    return res.status(200).json(order);
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

    const order = await Order.findById(id);

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

    return res.status(200).json(updatedOrder);
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
