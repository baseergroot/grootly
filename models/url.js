import { model, models, Schema, Types } from "mongoose";


const urlSchema = new Schema({
    author: {
        type: Types.ObjectId,
        ref: "User"
    },
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    }
});

const Url = models.Url || model("Url", urlSchema);
export default Url