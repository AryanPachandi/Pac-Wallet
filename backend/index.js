const express = require("express");
const app = express();
const routerUser = require("./routes/userAuth.js");
const UpdateUserRouter = require("./routes/updateUserCred.js");
const DeleteUserRouter = require("./routes/DeleteUser.js");
const UserTransactionRouter = require("./routes/transaction.js")
const cookieParser = require("cookie-parser");
const { User } = require("./models/User.js");

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/", routerUser)
app.use("/api/v1/updateUser" , UpdateUserRouter)
app.use("/api/v1/deleteUser" , DeleteUserRouter)
app.use("/api/v1/banking" , UserTransactionRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
