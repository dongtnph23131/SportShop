import joi from "joi";

export const colorValidators = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Màu sắc không được để trống",
        "any.required": 'Trường màu sắc là bắt buộc',
    }),
})