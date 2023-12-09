import mongoose from "mongoose";

const giftSchema = new mongoose.Schema(
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
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Gift", giftSchema);
