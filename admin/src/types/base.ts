export interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  status: ProductStatus;
  code: string;
  images: Image[];
  categoryId: { _id: string; name: string } | null;
  options: Option[];
  maxPrice: number;
  minPrice: number;
  purchases: number;
  productVariantIds: ProductVariant[];
}

export interface ProductVariant {
  _id: string;
  sku: string;
  name: string;
  price: number;
  inventory: number;
  options: string[];
  image: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
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

export enum ProductStatus {
  ACTIVE = "Active",
  DRAFT = "Draft",
  ARCHIVED = "Archived",
}

export interface Order {
  _id: string;
  code: string;
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
    productName: string;
    productVariantName: string;
    productVariantPrice: string;
    image: number;
    quantity: number;
    _id: string;
  }[];
  managerId: string;
  shipperId: string;
}

export interface Customer {
  addressIds: string[];
  orderIds: string[];
  giftIds: string[];
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface Comment {
  _id: string;
  customerId: string;
  productId: string;
  content: string;
  raiting: string;
  isHidden: boolean;
  default: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Discount {
  _id: string;
  code: string;
  description: string;
  type: DiscountType;
  amountPrice: number;
  percentage: number;
  startAt: string;
  endAt: string;
  usageLimit: number;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export enum DiscountType {
  PERCENTAGE = "Percentage",
  FIXED_AMOUNT = "Fixed Amount",
}

export enum BannerStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export interface Banner {
  _id: string;
  name: string;
  image: string;
  status: BannerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: UserRole;
  phone: string;
  avatar: string;
  orders: string[];
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
  SHIPPER = "shipper",
}

export interface Gift {
  _id: string;
  code: string;
  description: string | null;
  amountPrice: number;
  endAt: string | null;
  isDisabled: boolean;
  customerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
