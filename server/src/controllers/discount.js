import Discount from "../models/discount";
export const searchDiscount = async (req, res) => {
  try {
    const code = req.params.code;
    const discount = await Discount.findOne({ code: code });
    if (!discount) {
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
