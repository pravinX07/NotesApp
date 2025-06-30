// controllers/authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
  return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  })
}

export const signup = async (req, res) => {
  const {username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password, username });
  const token = generateToken(user._id)



  return res.status(201).json({ 
    token:token,
    message: "User created" });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });


    const token = generateToken(user._id)
   
    // res.json({ token });

    return res
      .status(201)
      .json({
        message: "User Login Successfully",
        token,
        user: { email },
      });
  } catch (err) {
    res.status(500).json({ message: "Login failed..", error: err.message });
  }
};


export const getAllUsers = async(req,res) => {
  let user = await User.find();

  if(!user){
    return res.json({
      message:"users not found"
    })
  }
  return res.json({
    users:user
  })
  
}