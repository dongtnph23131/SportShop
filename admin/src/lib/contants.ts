import { ProductStatus } from "@/types/base";

export const API_URL = "http://localhost:8080";

export const productStatus = [
  ProductStatus.ACTIVE,
  ProductStatus.DRAFT,
  ProductStatus.ARCHIVED,
];

export const roles = ["admin", "staff", "shipper"];

export const discountTypes = ["Percentage", "Fixed Amount"];
