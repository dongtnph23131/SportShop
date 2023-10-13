import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productImgSchema = mongoose.Schema(
    {
        src: {
            type: String
        },
        poitision: {
            type: Number
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
        },
    },
    { timestamps: true, versionKey: false }
);
productImgSchema.plugin(mongoosePaginate);

export default mongoose.model("ProductImg", productImgSchema);