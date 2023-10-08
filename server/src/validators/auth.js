import joi from "joi";

export const signupValidators = joi.object({
    firtsName: joi.string().required().messages({
        "string.empty": "firtsName không được để trống",
        "any.required": 'Trường firtsName  là bắt buộc',
    }),
    lastName: joi.string().required().messages({
        "string.empty": "LastName không được để trống",
        "any.required": 'Trường firtsName  là bắt buộc',
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": 'Trường email là bắt buộc',
        "string.email": "Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "Mật khẩu không khớp",
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
    }),
});