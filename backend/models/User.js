const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://pachandiaryan:Aryan1515@aryanpachandi.bew7r.mongodb.net/paytm");

const UserSchema =new mongoose.Schema({
  fullname  : {type : String , required :true},
  username  : {type : String , required:true },
  password  : {type : String , required:true },
  upiId     : {type : String  ,required:true},
  password  : {type : String , required:true , unique:true}
})

const User = mongoose.model('User' , UserSchema);

module.exports=  {
  User
};
