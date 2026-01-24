const express = require("express")

const {User} = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const dotenv = require("dotenv");



//routers
const routerUser = express.Router();


const app = express();
dotenv.config();





const registerSchema = z.object({
  fullname: z.string().min(1),
  emailId: z.string().email(),
  password: z.string().min(6),
  phoneNo: z.number().min(10),
});
const loginSchema = z.object({
  phoneNo: z.number().min(10),
  password: z.string().min(6),
});


const validateUser = (schema) =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.format()});
    }

   req.body = result.data;
    next();
  }


// type User = z.infer<typeof UserSchema>




routerUser.post("/register", validateUser(registerSchema), async (req, res) => {

  const { fullname, emailId, password ,phoneNo} = req.body;


  try {

    const existingUser = await User.findOne({emailId});

    if (existingUser) {
      return res.status(400).json({ message: `User ${emailId} already exists` });
    }
} catch (error) {
  if (error.code === 11000) {
    //     console.error("REGISTER ERROR FULL:", error);
    // console.error("REGISTER ERROR MESSAGE:", error.message);
    // console.error("REGISTER ERROR CODE:", error.code);
    // console.error("REGISTER ERROR KEYVALUE:", error.keyValue);

    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      message: `${field} already exists`
    });
  }

  return res.status(500).json({
    message: "Internal server error"
  });
}

    try {
    const existingPhoneNO = await User.findOne({ phoneNo });
    if (existingPhoneNO) {
      return res.status(400).json({ message: `Phone NO ${phoneNo} already exists` });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error in registering user problem while finding existing Phone NO" });
  }


try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const PacId  =phoneNo+"@pacwallet"
  const user = await User.create({
    fullname,
    emailId,
    password: hashedPassword,
    PacId,
    phoneNo,
  });
return res.status(201).json({
  message: "User created successfully",
  user: {
    fullname,
    emailId,
    PacId,
    id: user._id
  }
});
} catch (error) {
  res.status(500).json({ message: "Error in registering user" });
}

});

routerUser.post("/login", validateUser(loginSchema), async (req, res) => {

  const { phoneNo, password } = req.body;

  try {
    const user = await User.findOne({
      phoneNo});

     if (!user || !await(bcrypt.compare(password, user.password))) {
      return res.status(404).json({ message: "User not found || Invalid Credentials" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid Credentials" });
    // }
      console.log("JWT_SECRET " , process.env.JWT_SECRET);
    const token = jwt.sign({ id: user._id , phoneNumber: phoneNo}, process.env.JWT_SECRET  ,{ expiresIn: "1h"});
    // console.log(token);
    res.status(200).json({ token : token });
  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
});





app.use(routerUser);

module.exports = routerUser;


