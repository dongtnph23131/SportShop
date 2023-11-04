import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Customer",
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

export default mongoose.model("Cart", cartSchema);
