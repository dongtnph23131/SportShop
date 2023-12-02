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
    type: {
      type: String,
      required: true,
      enum: ["Percentage", "Fixed Amount"],
    },
    amountPrice: {
      type: Number,
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
    },
    usageLimit: {
      type: Number,
      default: 0,
    },
    usageCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Discount", discountSchema);
