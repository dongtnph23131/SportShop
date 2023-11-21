import Comment from "../models/comment";
import Product from "../models/product";
import { commentValidators } from "../validators/comment";

export const create = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const { error } = commentValidators.validate(body);
    if (error) {
      return res.json({
        message: error.details.map((item) => item.message),
      });
    }
    const comment = await Comment.create({ ...req.body, customerId: user._id });
    await Product.findByIdAndUpdate(
      req.body.productId,
      {
        $addToSet: {
          comments: comment._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      message: "Đã bình luận chờ phê duyệt",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllCommentByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({ productId })
      .populate("productId")
      .populate("customerId");
    return res.status(200).json({
      message: "Lấy tất cả bình luận của sản phẩm thành công",
      comments,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
