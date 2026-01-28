const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User" ,
    required : true,
    index :true,
  },

  PacId      :{type : String, required : true ,index : true },
  accountNo : {type : Number, required : true ,index : true},
  balance : {type : Number, required : true , default : 0, min:0},
})

const Account = mongoose.model("Account", AccountSchema)

module.exports = Account;
