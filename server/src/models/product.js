import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
        size: {
            type: String,
            require: true
        },
        color: {
            type: String,
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        brand: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        description: {
            type: String,
            require: true
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);