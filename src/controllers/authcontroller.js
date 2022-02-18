require("dotenv").config()

const jwt = require("jsonwebtoken")

const User = require("../models/usermodel");


const newToken = (user) =>{
  return jwt.sign({ user}, 'shhhhh');
}



const register = async (req, res) => {
  try {
    // We will try to find the user with the email provided

    let user = await User.findOne({ email: req.body.email }).lean().exec();

    // if the user is found then its an error

    if (user)
      return res.status(400).send({ message: "Please try another email" });

    // if the user is not found then we will create the user with the email and the passwod provided
     
    user = await User.create(req.body);

    // then we will hash the password to make the password more secure
    // then we will create the token for that user
    
    const token = newToken(user)


    // the return the user and the token
 
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = (req, res) => {
  try {
    res.send("Login");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { register, login };
