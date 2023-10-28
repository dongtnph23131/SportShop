import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

export default mongoose.model("Color", colorSchema); 