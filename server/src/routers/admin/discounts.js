import { Router } from "express";
import Discount from "../../models/discount";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const discounts = await Discount.find();

    //sort discounts by startAt that is closest to today
    discounts.sort((a, b) => {
      return new Date(a.startAt) - new Date(b.startAt);
    });

    return res.status(200).json(discounts);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { code, description, count, type, amount, startAt, endAt } = req.body;

    const discount = await Discount.create({
      code,
      description,
      type,
      usageCount: count,
      ...(type === "Percentage" && { percentage: amount }),
      ...(type === "Fixed Amount" && { amountPrice: amount }),
      startAt,
      endAt,
    });

    return res.status(200).json(discount);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code, description, count, type, amount, startAt, endAt } = req.body;

    const discount = await Discount.findByIdAndUpdate(
      id,
      {
        code,
        description,
        type,
        usageCount: count,
        ...(type === "Percentage"
          ? { percentage: Number(amount) }
          : { amountPrice: 0 }),
        ...(type === "Fixed Amount"
          ? { amountPrice: Number(amount) }
          : { percentage: 0 }),
        startAt,
        endAt,
      },
      { new: true }
    );

    return res.status(200).json(discount);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Discount.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Deleted discount successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const discountRoutes = router;
