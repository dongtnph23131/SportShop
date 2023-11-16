import { Router } from "express";
import Order from "../../models/Order";
import Customer from "../../models/customer";

const router = Router();

router.get("/", async (req, res) => {
  const { from, to } = req.query;

  const formDay = from ? new Date(from) : undefined;
  const toDay = to ? new Date(to) : undefined;

  const orders = await Order.find(
    formDay || toDay
      ? {
          createdAt: {
            ...(formDay && { $gte: formDay }),
            ...(toDay && { $lte: toDay }),
          },
          status: "Completed",
        }
      : {}
  );

  const sale = orders.reduce((total, order) => {
    return total + order.orderTotalPrice;
  }, 0);

  const customers = await Customer.find(
    formDay || toDay
      ? {
          createdAt: {
            ...(formDay && { $gte: formDay }),
            ...(toDay && { $lte: toDay }),
          },
        }
      : {}
  );

  const dailySales = await Order.aggregate([
    {
      $match: {
        status: "Completed",
        createdAt: {
          ...(formDay && { $gte: formDay }),
          ...(toDay && { $lte: toDay }),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        total: { $sum: "$orderTotalPrice" },
      },
    },
  ]);

  const dailyOrders = await Order.aggregate([
    {
      $match: {
        status: "Completed",
        createdAt: {
          ...(formDay && { $gte: formDay }),
          ...(toDay && { $lte: toDay }),
        },
      },
    },
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    sale: {
      total: sale,
      daily: dailySales,
    },
    orders: {
      total: orders.length,
      daily: dailyOrders,
    },
    customers: customers.length,
  });
});

export const analyticRoutes = router;
