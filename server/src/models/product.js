import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
  {
    slug: { type: String },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        name: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
        publicId: {
          type: String,
          require: true,
        },
      },
    ],
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    minPrice: {
      type: Number,
    },
    maxPrice: {
      type: Number,
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
    productVariantIds: [
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
