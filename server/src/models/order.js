import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const ORDER_STATUS = ["pending", "confirmed", "completed", "canceled"];

const orderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Customer",
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
    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "pending",
    },
    shippingPrice: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    coupon_price: {
      type: Number,
      require: true,
    },
    type: {
      type: String,
    },
    items: [
      {
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
order.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
