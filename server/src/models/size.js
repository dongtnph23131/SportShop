import mongoose from "mongoose";

const sizeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

export default mongoose.model("Size", sizeSchema); 