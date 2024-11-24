import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name : String,
  image : String,
})

let userModel = mongoose.model('user',userSchema);

export default userModel;