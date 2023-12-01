import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const commentchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Customer",
    },
    productId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    content: {
      type: String,
      require: true,
    },
    raiting: {
      type: Number,
      default: 0,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
commentchema.plugin(mongoosePaginate);

export default mongoose.model("Comment", commentchema);
