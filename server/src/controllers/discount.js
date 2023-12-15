import Discount from "../models/discount";
export const searchDiscount = async (req, res) => {
  try {
    const code = req.params.code;
    const discount = await Discount.findOne({ code: code });
    if (!discount || discount.usageLimit >= discount.usageCount) {
      return res.status(400).json({
        message: "Mã khuyến mại không tồn tại",
      });
    }
    return res.status(200).json({
      discount,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getDiscount = async (req, res) => {
  try {
    const discounts = await Discount.find();
    discounts.sort((a, b) => {
      return new Date(a.startAt) - new Date(b.startAt);
    });

    return res.status(200).json(discounts);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
