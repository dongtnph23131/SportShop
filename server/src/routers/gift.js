import express from "express";
import Gift from "../models/gift";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.get("/gifts/:code", authenticate, async (req, res) => {
  try {
    const customerId = req.user._id;
    const code = req.params.code;

    const gift = await Gift.findOne({ code, customerId });

    if (gift.isDisabled) {
      return res.status(400).json({
        message: "Mã khuyến mại đã hết hạn",
      });
    }

    return res.status(200).json(gift);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/gifts", authenticate, async (req, res) => {
  try {
    const customerId = req.user._id; 

    const gift = await Gift.find({ customerId, isDisabled: false });

    return res.status(200).json(gift);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
