export interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  images: Image[];
  categoryId: { _id: string; name: string } | null;
  options: Option[];
  maxPrice: number;
  minPrice: number;
  productVariantIds: Variant[];
}

export interface Variant {
  name: string;
  price: number;
  inventory: number;
  options: string[];
  _id: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  slug: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  productIds: string[];
}

export interface Option {
  name: string;
  values: string[];
  _id: string;
}

export interface Image {
  name: string;
  url: string;
  publicId: string;
  _id: string;
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum OrderStatus {
  ONLINE = "online",
  DIRECT = "direct",
}

export interface Order {
  _id: string;
  fullName: string;
  email: string;
  phone: number;
  address: string;
  status: OrderStatus;
  shippingPrice: number;
  totalPrice: number;
  couponPrice: number;
  typePayment: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
