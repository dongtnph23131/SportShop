import mongoose from "mongoose";

const childProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
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
    img: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model('ChildProduct',childProductSchema)