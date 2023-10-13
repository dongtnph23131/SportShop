import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productOptionSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        values: {
            type: String
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
        },
    },
    { timestamps: true, versionKey: false }
);
productOptionSchema.plugin(mongoosePaginate);

export default mongoose.model("ProductOption", productOptionSchema);