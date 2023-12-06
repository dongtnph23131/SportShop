import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amountPrice: {
      type: Number,
    },
    endAt: {
      type: Date,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Discount", discountSchema);
