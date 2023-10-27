import joi from "joi";

export const productValidators = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên sản phẩm không được để trống",
        "any.required": 'Trường tên sản phẩm là bắt buộc',
    }),
    categoryId: joi.string().required().messages({
        "string.empty": "Tên danh mục không được để trống",
        "any.required": 'Trường tên danh mục là bắt buộc',
    }),
    description: joi.string().required().messages({
        "string.empty": "Mô tả không được để trống",
        "any.required": 'Trường mô tả là bắt buộc',
    }),
});