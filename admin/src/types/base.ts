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
  productVariantIds: ProductVariant[];
}

export interface ProductVariant {
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
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export enum PaymentType {
  ONLINE = "Online",
  DIRECT = "Direct",
}

export enum OrderPaymentStatus {
  NOT_PAID = "Not paid",
  PAID = "Paid",
  CANCELED = "Canceled",
}

export enum OrderDeliveryStatus {
  NOT_SHIPPED = "Not shipped",
  SHIPPING = "Shipping",
  SHIPPED = "Shipped",
  CANCELED = "Canceled",
}

export interface Order {
  _id: string;
  fullName: string;
  email: string;
  phone: number;
  address: string;
  deliveryStatus: OrderDeliveryStatus;
  paymentStatus: OrderPaymentStatus;
  orderId: number;
  orderTotalPrice: number;
  status: OrderStatus;
  shippingPrice: number;
  totalPrice: number;
  couponPrice: number;
  typePayment: PaymentType;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  items: {
    productId: string;
    productVariantId: string;
    quantity: number;
    _id: string;
  }[];
}

export interface Customer {
  addressIds: string[];
  orderIds: string[];
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: "2023-11-04T16:00:10.314Z";
  updatedAt: "2023-11-04T16:00:10.314Z";
}

export interface Profile {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
