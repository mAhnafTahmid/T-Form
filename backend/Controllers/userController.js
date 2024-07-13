import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../Utilities/generateTokenAndSetCookie.js";

export const userSignup = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords didn't match" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save hashed password
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      codes: newUser.codes,
    });
  } catch (error) {
    console.error("Server error in signing up:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      codes: user.codes,
    });
  } catch (error) {
    console.error("Server error in logging in:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Server error in logging out:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserAttemptedCodes = async (req, res) => {
  try {
    const userId = req.user._id;
  } catch (error) {}
};
