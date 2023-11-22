import { z } from "zod";

export const categoryCreateEditSchema = z.object({
  name: z.string().min(1, { message: "Category name is required!" }),
  slug: z.string().min(1, { message: "Category slug is required!" }),
  description: z
    .string()
    .min(1, { message: "Category description is required!" }),
});
