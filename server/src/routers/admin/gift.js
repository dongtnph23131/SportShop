import { Router } from "express";
import Gift from "../../models/gift";

const router = Router();

router.put("/:id/disable", async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(
      req.params.id,
      {
        isDisabled: true,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Disable gift successfully!", data: gift });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const giftRoutes = router;
