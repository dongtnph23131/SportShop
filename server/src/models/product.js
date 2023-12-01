import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
  {
    slug: { type: String },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Active",
    },
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
    views: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Number,
      default: 0,
    },
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
    raitings: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
