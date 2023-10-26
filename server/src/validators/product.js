import joi from "joi";

export const productValidators = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên sản phẩm không được để trống",
        "any.required": 'Trường tên sản phẩm là bắt buộc',
    }),
    categoryId: joi.string().required().messages({
        "string.empty": "Tên danh mục không được để trống",
        "any.required": 'Trường tên là bắt buộc',
    }),
    sizes: joi.array().items(joi.string()).required().messages({
        "any.required": 'Trường kích thước là bắt buộc',
    }),
    colors: joi.array().items(joi.string()).required().messages({
        "any.required": 'Trường màu sắc là bắt buộc',
    }),
    quantity: joi.number().required().messages({
        "string.empty": "Số lượng sản phẩm không được để trống",
        "any.required": "Trường số lượng là bắt buộc",
    }),
    brand: joi.string().required().messages({
        "string.empty": "Thương hiệu không được để trống",
        "any.required": "Trường thương hiệu là bắt buộc",
    }),
    price: joi.number().min(6).required().messages({
        "string.empty": "Giá sản phẩm không được để trống",
        "any.required": "Trường giá là bắt buộc",
    }),
    description: joi.string().required().messages({
        "string.empty": "Mô tả không được để trống",
        "any.required": 'Trường mô tả là bắt buộc',
    }),
});