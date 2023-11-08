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
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "CartItem",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
cartSchema.plugin(mongoosePaginate);

export default mongoose.model("Cart", cartSchema);
