const mongoose = require("mongoose")

const TranscationSchema = new mongoose.Schema({
  pacId : {type : String, required : true},
  fromPacId : {type :String , required : true},
  toPacId : {type :String , required : true},
  amount : {type : Number, required : true},
  Transcation : {type : String , required : true , enum :["debited" , "credited"]},
  date : {type : Date, required : true},
  status : {type : String, required : true},
})

const Transcation = mongoose.model("Transcation", TranscationSchema)

module.exports = Transcation;
