import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductVariantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    inventory: {
      type: Number,
      require: true,
    },
    options: [String],
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
ProductVariantSchema.plugin(mongoosePaginate);

export default mongoose.model("ProductVariant", ProductVariantSchema);
