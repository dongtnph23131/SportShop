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
    price:joi.number().min(0).required().messages({
        "number.empty": "Giá không được để trống",
        "any.required": 'Trường giá là bắt buộc',
        "number.base":"Gía là số",
        "number.min":"Gía là số dương"
    }),
    photoDescription:joi.string().required().messages({
        "string.empty": "Ảnh mô tả không được để trống",
        "any.required": 'Trường ảnh mô tả là bắt buộc',
    }),
});