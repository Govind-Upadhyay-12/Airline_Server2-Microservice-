import UserSchema from "../models/User.js";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
var secretKey = "hahaahhahahahahahahahahah";
export async function SignUp(req,res){
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newUser = new UserSchema({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    console.log("new user created");
    res.status(201).json(newUser);
  } catch (err) {
    if (!err.message.includes("E11000")) {
      throw err;
    } else {
      return res.status(409).send("Error: Email already in use");
    }
  }
}
export async function SignIn(req,res){
    console.log(req.body);
    const { password, email } = req.body;
    try {
      const validUser = await UserSchema.findOne({ email: email });
      console.log(validUser);
      if (!validUser) {
        return res.status(404).json({ message: "User not found" });
      }
       const validPassword = await bcryptjs.compare(password, validUser.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
       const { _id, password: hashedPassword, ...userInfo } = validUser._doc;
      const token = jwt.sign({ id: _id }, secretKey);
  
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res
        .status(200)
        .json({ message: "User logged in successfully", userInfo });
    } catch (error) {
      console.error("Error signing in", error.message);
     return  res.status(500).json({ message: "Internal server error" });
     
    }
  
}