import { Schema, models, model, Types } from "mongoose"


const userSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  shortUrls: [{
    type: Types.ObjectId,
    ref: "Url"
  }]
})

const User = models.User || model("User", userSchema);

export default User