const express = require("express")
const {User} = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
const {CreateAccount} = require("../services/accGenerator.js");


const { authMiddleware } = require("../Auth/UserMiddleware.js");
const { json } = require("body-parser");
const transactionMiddleware = require("../Auth/transactionMiddleware.js")

const Account = require("../models/acc.js")

const UserTransactionRouter = express.Router()



dotenv.config();


UserTransactionRouter.post("/balance", authMiddleware,async(req,res)=>{
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




// UserTransactionRouter.post("/send-money" , async(req,res)=>{
//   const password = req.body.password;
//   const userId = req.userId
//   const toPacId = req.body.toPacId;
//   const amount  = req.body

//   const user =await  User.findById({userId})

//   if(!await(bcrypt.compare(password , user.password)))
//   {
//     return res.status(401).json({
//       message:"in-correct password"
//     })
//   }



// })


module.exports = UserTransactionRouter
