import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
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
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dtsfrv4lf/image/upload/v1696781478/SportShop/c6e56503cfdd87da299f72dc416023d4-736x620_dgtvuh.jpg",
    },
    phone: {
      type: Number,
    },
    address: {
      type: [String],
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Customer", customerSchema);
