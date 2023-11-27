import mongoose from "mongoose";

export const status = ["Active", "Inactive"];

const bannerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: status,
      default: "Active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Banner", bannerSchema);
