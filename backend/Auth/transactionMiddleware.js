const jwt = require("jsonwebtoken");
const  dotenv = require("dotenv");

require("dotenv").config();

function transactionMiddleware(req,res,next){
const token = req.cookies.BankingToken;
console.log("cookies:", req.cookies);

if (!token) {
  return res.status(401).json({ message: "No token provided" });
}
console.log("SECRET:", process.env.JWT_SECRET);

try {

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.PacId = decoded.PacId;
  req.userId = decoded.userId
  next();
} catch (error) {
  res.status(401).json({ message: "Invalid token" });
}

}
module.exports =transactionMiddleware
