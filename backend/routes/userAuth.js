    const express = require("express")

    const {User} = require("../models/User.js");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcryptjs");
    const { z } = require("zod");
    const dotenv = require("dotenv");
    const {CreateAccount} = require("../services/accGenerator.js");

    const cookieParser = require("cookie-parser");



//routers
const routerUser = express.Router();


const app = express();
dotenv.config();
app.use(cookieParser());





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


routerUser.post("/register", validateUser(registerSchema), async (req, res) => {

  const { fullname, emailId, password ,phoneNo} = req.body;


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
  const AccountNo = await CreateAccount(user._id , PacId);
  return res.status(201).json({
   message: "User created successfully",
   AccountNo,
    user: {
    fullname,
    emailId,
    PacId,
  }
});

} catch (error) {
      if (error.code ===11000){
        const field = Object.keys(error.keyValue)[0]
        return res.status(400).json({
          message: `field ${field} already exits`
        })
      }

    console.error("REGISTER ERROR:", error); // IMPORTANT

    return res.status(500).json({
      message: "Registration failed"
    });
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

    const token = jwt.sign({ id: user._id , phoneNumber: phoneNo}, process.env.JWT_SECRET  ,{ expiresIn: "1h"});

 res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // important
      sameSite: "lax", // safer default
      maxAge: 60 * 60 * 1000
    });
     console.log("ENV:", process.env.NODE_ENV);

    return res.json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
});





app.use(routerUser);

module.exports = routerUser;


