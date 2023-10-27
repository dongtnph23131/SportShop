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
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [
            {
                colorId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Color',
                    required: true
                },
                sizeId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Size',
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                img: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);