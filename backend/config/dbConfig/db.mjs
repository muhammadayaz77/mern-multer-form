import mongoose from "mongoose";

let connecDB = async()=> {
try{
  await mongoose.connect('mongodb://localhost:27017/multer');
  console.log('connected...');
}
catch(err){
  console.log(err);
}
}

export default connecDB