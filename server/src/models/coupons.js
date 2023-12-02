import mongoose from "mongoose";
const Coupon_Type = ["1", "2"];
const couponSchema = new mongoose.Schema(
  {
    coupon_code: {
      type: String,
      required: true,
    },
    coupon_type: {
      type: String,
      required: true,
      enum: Coupon_Type,
    },
    coupon_price: {
      type: Number,
      required: true,
    },
    coupon_ratio: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    start_day: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    min_purchase_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Coupon", couponSchema);
