import joi from "joi";

export const sizeValidators = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên màu không được để trống",
        "any.required": 'Trường tên là bắt buộc',
    }),
})