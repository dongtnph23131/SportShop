import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
  {
    slug: { type: String, slug: "name" },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    minPrice: {
      type: Number
    },
    maxPrice: {
      type: Number
    },
    options: [
      {
        name: {
          type: String,
          require: true,
        },
        values: [String],
      },
    ],
    productVariants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ProductVariant",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
