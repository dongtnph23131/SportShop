import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productVariantsSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        originalPrice: {
            type: Number
        },
        price: {
            type: Number,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        inventory: {
            type: String
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
        },
    },
    { timestamps: true, versionKey: false }
);
productVariantsSchema.plugin(mongoosePaginate);

export default mongoose.model("ProductVariants", productVariantsSchema);