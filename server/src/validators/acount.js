import joi from "joi";

export const resetPasswordVilidators = joi.object({
  code: joi.number().required().messages({
    "number.empty": "Mã xác nhận không được để trống",
    "any.required": "Trường mã xác nhận là bắt buộc",
    "number.base": "Mã xác nhận là số",
  }),
  password: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "string.empty": "Cần nhập lại mật khẩu",
    "any.required": "Bắt buộc nhập lại mật khẩu",
  }),
});
export const forgotPasswordValidators = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": "Trường email là bắt buộc",
    "string.email": "Email không đúng định dạng",
  }),
});
export const updatePasswordVilidators = joi.object({
  currentPassword: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  password: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Mật khẩu không khớp",
    "string.empty": "Cần nhập lại mật khẩu",
    "any.required": "Bắt buộc nhập lại mật khẩu",
  }),
});