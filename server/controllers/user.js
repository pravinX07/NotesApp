// controllers/authController.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ userName, email, password });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save hashed refresh token
    const hashed = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenHash = hashed;
    await user.save();

    res.status(201).json({ accessToken, refreshToken, user: { userName, email } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


export const login = async(req,res) => {
    try{

    const{email,password} = req.body;
    const user = await User.findOne({email})

    if(!user || !(await user.isPasswordCorrect(password)))
        return res.status(401).json({message:"Invalid credentials"})
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save hashed refresh token
    const hashed = await bcrypt.hash(refreshToken, 10);
    user.refreshTokenHash = hashed;
    await user.save();

    res.status(201).json({ accessToken, refreshToken, user: {  email } });
  } catch (err) {
    res.status(500).json({ message: "Login failed..", error: err.message });
  }
}
