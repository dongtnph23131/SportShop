import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
    },
    { timestamps: true, versionKey: false }
);
collectionSchema.plugin(mongoosePaginate);

export default mongoose.model("Collection", collectionSchema);