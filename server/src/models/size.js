import mongoose from "mongoose";

const sizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    }]
});

export default mongoose.model("Size", sizeSchema); 