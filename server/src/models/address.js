import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const addressSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Customer",
    },
    name: {
      type: String,
    },
    default: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    district: {
      type: String,
    },
    ward: {
      type: String,
    },
    province: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
addressSchema.plugin(mongoosePaginate);

export default mongoose.model("Address", addressSchema);
