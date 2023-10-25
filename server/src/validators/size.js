import joi from "joi";

export const sizeValidators = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Kích thước không được để trống",
        "any.required": 'Trường kích thước là bắt buộc',
    }),
})