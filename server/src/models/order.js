import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const ORDER_STATUS = ["pending", "confirmed", "completed", "canceled"];
export const ORDER_PAYMENT = ["online", "direct"];
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
    couponPrice: {
      type: Number,
      default: 0,
    },
    typePayment: {
      type: String,
      enum: ORDER_PAYMENT,
      require: true,
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
