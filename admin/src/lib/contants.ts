import { ProductStatus } from "@/types/base";

export const API_URL = "http://localhost:8080";

export const CLIENT_URL = "http://localhost:5173";

export const productStatus = [ProductStatus.ACTIVE, ProductStatus.DRAFT];

export const roles = ["admin", "staff", "shipper"];

export const discountTypes = [
  {
    label: "Phần trăm",
    value: "Percentage",
  },
  {
    label: "Giá tiền",
    value: "Fixed Amount",
  },
];
