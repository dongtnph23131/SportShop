import Comment from "../models/comment";
import Order from "../models/order";
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
    const orders = await Order.find({ customerId: user._id }).populate(
      "items.productId items.productVariantId"
    );
    const isMatch = orders.map((item) => {
      const isCheck = item.items.find((itemChild) => {
        return (
          itemChild?.productId?._id.toString() == body?.productId.toString()
        );
      });
      return isCheck ? true : false;
    });
    if (!isMatch.includes(true)) {
      return res.status(400).json({
        message: "Mua hàng mới đc đánh giá",
      });
    }
    const comment = await Comment.create({ ...req.body, customerId: user._id });
    const order = await Order.findById(body.orderId);
    order.items = order.items.map((item) => {
      return item.productId.toString() === body.productId.toString()
        ? { ...item, isReview: true }
        : item;
    });
    await order.save();
    const product = await Product.findByIdAndUpdate(
      req.body.productId,
      {
        $addToSet: {
          comments: comment._id,
        },
      },
      { new: true }
    );
    const comments = await Comment.find({ productId: body.productId });
    let avg = 0;
    comments.forEach((rev) => {
      avg += rev.raiting;
    });
    product.raitings = Number(avg / comments.length);
    await product.save();
    return res.status(200).json({
      message: "Đáng giá thành công",
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
