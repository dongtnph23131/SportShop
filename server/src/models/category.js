import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    }]
});

export default mongoose.model("Category", categorySchema); 