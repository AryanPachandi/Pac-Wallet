const express = require("express")

const {User} = require("../models/User.js");


const {authMiddleware} = require("../Auth/UserMiddleware.js");

const DeleteUserRouter = express.Router();


DeleteUserRouter.delete("/",authMiddleware , async (req, res) => {
  const userId = req.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting user" });
  }
});


module.exports = DeleteUserRouter;
