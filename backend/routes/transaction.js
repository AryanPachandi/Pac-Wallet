const express = require("express")
const {User} = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
const {CreateAccount} = require("../services/accGenerator.js");


const { authMiddleware } = require("../Auth/UserMiddleware.js");
const { json } = require("body-parser");
const transactionMiddleware = require("../Auth/transactionMiddleware.js")


const Transcation =require("../models/transcations.js")

const Account = require("../models/acc.js");
const { default: mongoose } = require("mongoose");

const UserTransactionRouter = express.Router()



dotenv.config();


UserTransactionRouter.post("/", authMiddleware,async(req,res)=>{
  const password =req.body.password;
  const userId = req.userId
  try {
      const user  =await User.findById(userId);
  if(!userId || !await(bcrypt.compare(password , user.password))){
    return res.status(401).json({
      message :"incorrect password"
    })
  }
  const token =  jwt.sign({PacId:user.PacId , userId : user._id},process.env.JWT_SECRET ,{expiresIn : "3m"})
   res.cookie("BankingToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // important
      sameSite: "lax", // safer default
      maxAge: 3 * 60 * 1000
    });
    return res.json({ message: "pin correct " });
  } catch (error) {
     res.status(500).json({ message: "Error in login" });
  }

})
UserTransactionRouter.get("/acc", transactionMiddleware,async(req,res)=>{

  try {

    const userId = req.userId;

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(200).json({
      balance: account.balance
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch balance" });
  }
})


UserTransactionRouter.post("/transfer-money" ,transactionMiddleware ,async(req ,res)=>{
  const session = await mongoose.startSession();
   session.startTransaction();

  const {toPacId , amount} = req.body;
  console.log("FROM:", req.PacId);
console.log("TO:", toPacId);
console.log("AMOUNT:", amount);
  try {
    if(!await User.findOne({PacId:req.PacId}).session(session)){
      await session.abortTransaction()
      return res.status(401).json({
        message : "account not found try to login again"
      })
    }
    if(!await Account.findOne({PacId :req.PacId}).session()){
      await session.abortTransaction()
      return res.status(401).json({
        message : "account not found try to login again"
      })
    }
    const AccountBalance = await Account.findOne({PacId :req.PacId}).session(session);
    if(AccountBalance < amount){
       await session.abortTransaction()
      return res.status(401).json({
        message : "Insufficent balance"
      })
    }
    const ToPacIdAccount  = await Account.findOne({PacId : toPacId}).session(session);
    if(!ToPacIdAccount){
         await session.abortTransaction()
      return res.status(401).json({
        message : "Account not found to whom you are sending to"
      })
    }

    await Account.updateOne({PacId :req.PacId},{$inc :{balance : -amount}}).session(session) //from acc
    await Account.updateOne({PacId: toPacId} , {$inc :{balance : amount}}).session(session) // to acc

    await session.commitTransaction()
    res.status(200).json({
      message : "amount transfered successfully"
    })

  } catch (error) {
     console.error("TRANSACTION ERROR 👉", error);
  res.status(500).json({ error: error.message });
  }

})




module.exports = UserTransactionRouter
