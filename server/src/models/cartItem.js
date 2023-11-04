import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartItemSchema = mongoose.Schema(
    {
        productVariantIds: {
            type: mongoose.Types.ObjectId,
            ref: "ProductVariant",
            required: true,
        },
        productIds: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        },
        customerId: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "Customer",
        },
    },
    { timestamps: true, versionKey: false }
);
cartItemSchema.plugin(mongoosePaginate);

export default mongoose.model("CartItem", cartItemSchema);