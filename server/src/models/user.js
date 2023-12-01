import mongoose from "mongoose";

export const role = ["shipper", "staff", "admin"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: role,
    },
    phone: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dtsfrv4lf/image/upload/v1696781478/SportShop/c6e56503cfdd87da299f72dc416023d4-736x620_dgtvuh.jpg",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("User", userSchema);
