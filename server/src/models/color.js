import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    }]
});

export default mongoose.model("Color", colorSchema); 