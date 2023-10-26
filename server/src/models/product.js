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
            require: true
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