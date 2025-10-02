import { model, models, Schema } from "mongoose";


const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },

});

const Url = models.Url || model("Url", urlSchema);
export default Url