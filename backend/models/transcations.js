const mongoose = require("mongoose")

const TranscationSchema = new mongoose.Schema({
  userId : {ref: "User"},
  accountNo : {type : Number, required : true},
  amount : {type : Number, required : true},
  toWhom : {type : String , required : true},
  date : {type : Date, required : true},
  status : {type : String, required : true},
})

const Transcation = mongoose.model("Transcation", TranscationSchema)

module.exports = Transcation;
