import joi from "joi";

export const categoryValidators = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên danh mục không được để trống",
        "any.required": 'Trường tên là bắt buộc',
    }),
})