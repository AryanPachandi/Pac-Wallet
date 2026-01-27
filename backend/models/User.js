const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

const UserSchema =new mongoose.Schema({
  fullname  : {type : String , required :true},
  emailId  : {type : String , required:true , unique:true},
  password  : {type : String , required:true },
  PacId     : {type : String  ,required:true ,unique:true},
  phoneNo   : {type : Number , required:true , unique:true}
})

const User = mongoose.model('User' , UserSchema);

module.exports=  {
  User
};
