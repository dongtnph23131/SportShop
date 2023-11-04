import { z } from "zod";

export const productCreateBodySchema = z.object({
  slug: z.string().min(1, "Slug không được để trống"),
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  description: z.string(),
  categoryId: z.string().min(1, "Danh mục không được để trống!"),
  options: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()),
    })
  ),
  variants: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.array(z.string()),
    })
  ),
  images: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      publicId: z.string(),
    })
  ),
});

export const productUpdateBodySchema = z.object({
  id: z.string(),
  slug: z.string().min(1, "Slug không được để trống"),
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  description: z.string(),
  categoryId: z.string().min(1, "Danh mục không được để trống!"),
  options: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()),
    })
  ),
  variants: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      inventory: z.number(),
      options: z.array(z.string()),
    })
  ),
  images: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      publicId: z.string(),
    })
  ),
});
