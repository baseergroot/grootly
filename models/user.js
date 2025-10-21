import { Schema, models, model } from "mongoose"


const userSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  shortUrls: ["Url"]
})

const User = models.User || model("User", userSchema);

export default User