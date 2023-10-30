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
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        photoDescription: {
            type: String,
            required: true
        },
        childproducts:[
            {
                type:mongoose.Types.ObjectId,
                ref:'ChildProduct'
            }
        ]
    },
    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);