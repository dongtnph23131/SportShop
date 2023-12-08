import joi from "joi";

export const commentValidators = joi.object({
  productId: joi.string().required().messages({
    "string.empty": "Tên id sản phẩm không được để trống",
    "any.required": "Trường id sản phẩm là bắt buộc",
  }),
  content: joi.string().required().messages({
    "string.empty": "Nội dung không được để trống",
    "any.required": "Nội dung là bắt buộc bắt buộc",
  }),
  raiting: joi.number().required().messages({
    "number.empty": "Đánh giá sao không được để trống",
    "any.required": "Đánh giá sao là bắt buộc bắt buộc",
  }),
  orderId: joi.string(),
});
