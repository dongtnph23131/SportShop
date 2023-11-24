import { z } from "zod";
import joi from "joi";

export const categoryValidators = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Tên danh mục không được để trống",
    "any.required": "Trường tên là bắt buộc",
  }),
  slug: joi.string().required().messages({
    "string.empty": "Slug không được để trống",
    "any.required": "Slug bắt buộc",
  }),
});

export const categoryCreateEditSchema = z.object({
  name: z.string().min(1, { message: "Category name is required!" }),
  description: z.string(),
  image: z.string(),
});
