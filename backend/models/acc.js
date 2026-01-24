const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
  userId : {ref: "User"},
  accountNo : {type : Number, required : true},
  balance : {type : Number, required : true},
})

const Account = mongoose.model("Account", AccountSchema)

module.exports = Account;
