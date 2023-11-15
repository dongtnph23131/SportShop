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

  const monthlySales = await Order.aggregate([
    // {
    //   $match: {
    //     createdAt: {
    //       ...(formDay && { $gte: formDay }),
    //       ...(toDay && { $lte: toDay }),
    //     },
    //   },
    // },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$orderTotalPrice" },
      },
    },
  ]);

  res.status(200).json({
    sale,
    orders: orders.length,
    customers: customers.length,
    monthlySales,
  });
});

export const analyticRoutes = router;
