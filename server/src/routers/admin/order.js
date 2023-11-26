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
      date,
    } = req.query;
    const options = {
      page: _page,
      limit: _limit,
      sort: {
        [_sort]: _order === "desc" ? -1 : 1,
      },
    };

    const startOfDay = new Date(date);
    const endOfDay = new Date(
      new Date(date).setDate(new Date(date).getDate() + 1)
    );

    let searchQuery = {
      ...(q
        ? {
            code: { $regex: q, $options: "i" },
          }
        : {}),
      ...(status !== "all" && status ? { status: status } : {}),
      ...(date ? { createdAt: { $gte: startOfDay, $lte: endOfDay } } : {}),
    };

    const orders = await Order.paginate(searchQuery, options);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find();

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
      "items.productId items.productVariantId customerId"
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
      status: "Completed",
      paymentStatus: "Paid",
    });

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
