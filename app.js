const express = require("express");
const connect = require("./src/configs/db");
const userController = require("./src/controllers/usercontroller")
const {register,login} = require("./src/controllers/authcontroller")
const app = express();

app.use(express.json())

// Register
app.use("/user",userController);
app.post("/register",register);
// Login
app.post("/login",login);



const start = async () => {
  await connect();
  app.listen(1150, () => {
    console.log("Listening on Port 1150");
  });
};

start();
