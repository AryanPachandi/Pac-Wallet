const express = require("express")

const {User} = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const dotenv = require("dotenv");

const {authMiddleware} = require("../Auth/UserMiddleware.js");

const UpdateUserRouter = express.Router();

const app = express();
dotenv.config();

const updateemailIdSchema = z.object({
  ChangeEmailId: z.string().email(),
});

const updatefullnameSchema = z.object({
  ChangeFullname: z.string().min(1),
});

const updatepasswordSchema = z.object({
  ChangePassword: z.string().min(6),
});

const validateUser = (schema)=>
(req, res, next) => {
  const result = schema.safeParse(req.body)
  if(!result.success){
    return res.status(400).json({ message: result.error.format()});
  }

  req.body = result.data;
  next();
}

UpdateUserRouter.put("/emailId",authMiddleware , validateUser(updateemailIdSchema), async (req, res) => {
  const { ChangeEmailId } = req.body;
  const userId = req.userId;

  try {
    await User.findOneAndUpdate({_id : userId} , { emailId : ChangeEmailId },{ new: true });
    res.status(200).json({ message: "Email Id updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error in updating user" });
  }
});

UpdateUserRouter.put("/fullname",authMiddleware ,validateUser(updatefullnameSchema), async (req, res) => {
  const { ChangeFullname } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findOneAndUpdate({_id : userId} , { fullname : ChangeFullname },{ new: true });
    res.status(200).json({ message: "Fullname updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error in updating user" });
  }
});

UpdateUserRouter.put("/password",authMiddleware ,validateUser(updatepasswordSchema), async (req, res) => {
  const { ChangePassword } = req.body;
  const userId = req.userId;
  const hashedPassword = await bcrypt.hash(ChangePassword, 10);
  try {
    const user = await User.findOneAndUpdate({_id : userId} , { password : hashedPassword },{ new: true });
    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error in updating user" });
  }
});

UpdateUserRouter.post("/profile",authMiddleware , async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password").select("-_id");

    res.status(200).json({ message: "User details", user });
  } catch (error) {
    res.status(500).json({ message: "Error in updating user" });
  }
});

app.use(UpdateUserRouter);

module.exports = UpdateUserRouter;
