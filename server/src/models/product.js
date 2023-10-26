import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
        sizes: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Size',
                required: true
            }
        ],
        colors: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Color',
                required: true
            }
        ],
        quantity: {
            type: Number,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);