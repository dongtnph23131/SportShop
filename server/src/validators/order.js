import { z } from "zod";
export const orderSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  shippingPrice: z.number().min(0),
  totalPrice: z.number().min(0),
  typePayment: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      productVariantId: z.string(),
      quantity: z.number().min(0),
      productVariantName: z.string(),
      productVariantPrice: z.number(),
      image: z.string(),
      productName: z.string(),
    })
  ),
});
