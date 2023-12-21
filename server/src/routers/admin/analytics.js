import { Router } from "express";
import Order from "../../models/order";
import Customer from "../../models/customer";
import Product from "../../models/product";

const router = Router();

router.get("/", async (req, res) => {
  const { from, to } = req.query;

  const formDay = from ? new Date(from) : undefined;
  const toDay = to
    ? new Date(new Date(to).setDate(new Date(to).getDate() + 1))
    : undefined;

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
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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

router.get("/top", async (req, res) => {
  const topProducts = await Product.find().sort({ purchases: -1 }).limit(5);
  const customers = await Customer.find().populate("orderIds");

  const topCustomers = customers
    .map((customer) => {
      const totalOrderPrice = customer.orderIds.reduce((total, order) => {
        return total + order.orderTotalPrice;
      }, 0);

      return {
        ...customer._doc,
        totalOrderPrice,
      };
    })
    .sort((a, b) => b.totalOrderPrice - a.totalOrderPrice)
    .slice(0, 5);

  res.status(200).json({ topProducts, topCustomers });
});

export const analyticRoutes = router;
