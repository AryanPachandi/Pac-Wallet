const express = require("express");
const app = express();
const routerUser = require("./routes/index.js");

app.use(express.json());

app.use("/api/v1" , routerUser)


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
