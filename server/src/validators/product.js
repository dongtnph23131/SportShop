// import joi from "joi";

// export const productValidators = joi.object({
//     name: joi.string().required().messages({
//         "string.empty": "Tên sản phẩm không được để trống",
//         "any.required": 'Trường tên sản phẩm là bắt buộc',
//     }),
//     description: joi.string().required().messages({
//         "string.empty": "Mô tả không được để trống",
//         "any.required": 'Trường mô tả là bắt buộc',
//     }),
//     brand: joi.string().required().messages({
//         "string.empty": "Thương hiệu không được để trống",
//         "any.required": "Trường thương hiệu là bắt buộc",
//     }),
//     price: joi.number().min(6).required().messages({
//         "string.empty": "Giá sản phẩm không được để trống",
//         "any.required": "Trường giá là bắt buộc",
//     }),
// });