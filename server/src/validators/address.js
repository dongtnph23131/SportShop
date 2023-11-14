import joi from "joi";
export const addressValidators = joi.object({
  address: joi.string().required().messages({
    "string.empty": "Địa chỉ không được để trống",
    "any.required": "Trường địa chỉ tên là bắt buộc",
  }),
  district: joi.string().required().messages({
    "string.empty": "district không được để trống",
    "any.required": "district bắt buộc",
  }),
  ward: joi.string().required().messages({
    "string.empty": "ward không được để trống",
    "any.required": "ward bắt buộc",
  }),
  province: joi.string().required().messages({
    "string.empty": "province không được để trống",
    "any.required": "province bắt buộc",
  }),
  phone: joi.string().required().messages({
    "string.empty": "phone không được để trống",
    "any.required": "phone bắt buộc",
  }),
  name: joi.string().required().messages({
    "string.empty": "name không được để trống",
    "any.required": "name bắt buộc",
  }),
  default:joi.boolean()
});
