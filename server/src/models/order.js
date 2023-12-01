import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const ORDER_STATUS = ["Pending", "Completed", "Canceled"];
export const ORDER_DELIVERY_STATUS = [
  "Not shipped",
  "Shipping",
  "Shipped",
  "Canceled",
];
export const ORDER_PAYMENT_STATUS = [
  "Not paid",
  "Paid",
  "Refunded",
  "Canceled",
];
export const ORDER_PAYMENT = ["Online", "Direct"];

const orderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Customer",
    },
    code: {
      type: String,
      require: true,
    },
    orderId: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    note: {
      type: String,
    },
    deliveryStatus: {
      type: String,
      enum: ORDER_DELIVERY_STATUS,
      default: "Not shipped",
    },
    paymentStatus: {
      type: String,
      enum: ORDER_PAYMENT_STATUS,
      default: "Not paid",
    },
    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "Pending",
    },
    shippingPrice: {
      type: Number,
      require: true,
    },
    couponPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    orderTotalPrice: {
      type: Number,
      require: true,
    },
    typePayment: {
      type: String,
      enum: ORDER_PAYMENT,
      require: true,
    },
    managerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    shipperId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        productVariantId: {
          type: mongoose.Types.ObjectId,
          require: true,
          ref: "ProductVariant",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
