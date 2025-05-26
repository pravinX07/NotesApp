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


